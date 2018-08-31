import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { API_URL, CRYPTO_CURRENCY, EXCHANGE_ACTION, FIAT_CURRENCY, MIN_AMOUNT, NB_BLOCKS, URL } from '@/constants';
import createForm from '@/components/core/form/createForm';
import { change, Field, formValueSelector } from 'redux-form';
import './Deposit.scss';
import { fieldInput } from '@/components/core/form/customField';

import iconBitcoin from '@/assets/images/icon/coin/btc.svg';
import iconEthereum from '@/assets/images/icon/coin/eth.svg';
import iconBitcoinCash from '@/assets/images/icon/coin/bch.svg';
import iconLock from '@/assets/images/icon/icons8-lock_filled.svg';
import { formatMoneyByLocale } from '@/services/offer-util';
import { isNormalInteger, minValue, number, required } from '@/components/core/form/validation';
import { bindActionCreators } from 'redux';
import { createCreditATM, depositCoinATM, getCreditATM, trackingDepositCoinATM } from '@/reducers/exchange/action';
import { getErrorMessageFromCode } from '@/components/handshakes/exchange/utils';
import { hideLoading, showAlert, showLoading } from '@/reducers/app/action';
import { MasterWallet } from '@/services/Wallets/MasterWallet';
import * as gtag from '@/services/ga-utils';
import taggingConfig from '@/services/tagging-config';
import CreditATM from '@/services/neuron/neuron-creditatm';

const nameFormEscrowDeposit = 'escrowDeposit';
const FormEscrowDeposit = createForm({
  propsReduxForm: {
    form: nameFormEscrowDeposit,
  },
});

const selectorFormEscrowDeposit = formValueSelector(nameFormEscrowDeposit);

export const CRYPTO_ICONS = {
  [CRYPTO_CURRENCY.ETH]: iconEthereum,
  [CRYPTO_CURRENCY.BTC]: iconBitcoin,
  BCH: iconBitcoinCash,
};

const CRYPTO_CURRENCY_CREDIT_CARD = {
  ...CRYPTO_CURRENCY, BCH: 'BCH',
};

const listCurrency = Object.values(CRYPTO_CURRENCY_CREDIT_CARD).map((item) => {
  return { name: item, icon: CRYPTO_ICONS[item] };
});

class EscrowDeposit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: {},
    };
  }
  componentDidMount() {
    this.getCreditATM();
    // this.createCreditATM();
  }

  getCreditATM = () => {
    this.props.getCreditATM({ PATH_URL: API_URL.EXCHANGE.CREDIT_ATM });
  }

  createCreditATM = () => {
    const { authProfile, app } = this.props;
    const params = {
      username: authProfile?.username,
      email: authProfile?.email,
    };

    this.props.createCreditATM({
      PATH_URL: API_URL.EXCHANGE.CREDIT_ATM,
      data: params,
      METHOD: 'POST',
      successFn: this.handleCreateCreditATMSuccess,
      errorFn: this.handleCreateCreditATMFailed,
    });
  }

  handleCreateCreditATMSuccess = (data) => {
    console.log('handleCreateCreditATMSuccess', data);

    this.handleDeposit();
  }

  handleCreateCreditATMFailed = (e) => {
    this.hideLoading();

    this.props.showAlert({
      message: <div className="text-center">{getErrorMessageFromCode(e)}</div>,
      timeOut: 3000,
      type: 'danger',
    });
  }

  handleValidate = (values) => {
    console.log('handleValidate', values);
    const { percentage } = values;
    const errors = {};

    let isError = true;
    for (const item of Object.values(CRYPTO_CURRENCY_CREDIT_CARD)) {
      const amount = values[`amount_${item}`];

      if (amount && amount.trim().length > 0) {
        isError = false;

        errors[`percentage_${item}`] = required(values[`percentage_${item}`]);

        // break;
      }
    }

    if (isError) {
      for (const item of Object.values(CRYPTO_CURRENCY_CREDIT_CARD)) {
        errors[`amount_${item}`] = required(values[`amount_${item}`]);
      }
    } else {
      for (const item of Object.values(CRYPTO_CURRENCY_CREDIT_CARD)) {
        errors[`amount_${item}`] = minValue(MIN_AMOUNT[item])(values[`amount_${item}`]);
      }
    }

    return errors;
  }

  checkMainNetDefaultWallet = (currency) => {
    const wallet = MasterWallet.getWalletDefault(currency);

    const result = !!wallet;

    if (!result) {
      const message = <FormattedMessage id="escrow.label.wallet.setDefaultWallet" values={{ currency }} />;
      this.props.showAlert({
        message: <div className="text-center">{message}</div>,
        timeOut: 3000,
        type: 'danger',
      });
    }

    return result;
  }

  handleOnSubmit = (values) => {
    console.log('handleOnSubmit', values);

    this.setState({ values: values }, () => {
      const { depositInfo } = this.props;

      this.showLoading();

      if (!depositInfo) {
        this.createCreditATM();
      } else {
        this.handleDeposit();
      }
    });
  }

  handleDeposit = () => {
    const { values } = this.state;

    for (const item of Object.values(CRYPTO_CURRENCY_CREDIT_CARD)) {
      const amount = values[`amount_${item}`];

      if (amount && amount.trim().length > 0) {
        if (!this.checkMainNetDefaultWallet(item)) {
          this.hideLoading();
          return;
        }
      }
    }

    for (const item of Object.values(CRYPTO_CURRENCY_CREDIT_CARD)) {
      const amount = values[`amount_${item}`];
      const percentage = values[`percentage_${item}`];

      if (amount && amount.trim().length > 0) {
        this.depositCoin(item, amount, percentage);
      }
    }
  }

  depositCoin = (currency, amount, percentage) => {
    const wallet = MasterWallet.getWalletDefault(currency);
    const params = {
      currency,
      amount,
      percentage,
      user_address: wallet.address,
    };

    this.props.depositCoinATM({
      PATH_URL: API_URL.EXCHANGE.DEPOSIT_CREDIT_ATM,
      data: params,
      METHOD: 'POST',
      successFn: this.handleDepositCoinSuccess,
      errorFn: this.handleDepositCoinFailed,
    });
  }

  trackingDeposit = (deposit, tx_hash, currency, action, reason) => {
    const params = {
      deposit,
      tx_hash,
      currency,
      action: 'deposit',
      reason,
    };

    this.props.trackingDepositCoinATM({
      PATH_URL: API_URL.EXCHANGE.CREDIT_ATM_TRANSFER,
      data: params,
      METHOD: 'POST',
    });
  }

  handleDepositCoinSuccess = async (data) => {
    this.hideLoading();

    console.log('handleDepositCoinSuccess', data);

    const { percentage } = this.props;

    const {
      data: {
        id, amount, currency, system_address, status,
      },
    } = data;

    // const currency = 'ETH';
    // const amount = '0.01';
    // const status = 'success';
    // const id = '123';
    // const system_address = '0x446b95a1b02af808fa13711cb7d7469617ae9775';

    gtag.event({
      category: taggingConfig.depositATM.category,
      action: taggingConfig.depositATM.action.depositSuccess,
      label: currency,
      value: amount,
    });

    const wallet = MasterWallet.getWalletDefault(currency);
    if (currency === '') {
      try {
        const creditATM = new CreditATM(wallet.chainId);

        const result = await creditATM.deposit(amount, percentage, id);
        console.log('handleDepositCoinSuccess', result);

        this.trackingDeposit(id, result.hash, currency, status, '');
      } catch (e) {
        this.trackingDeposit(id, '', currency, status, e.toString());
        console.log('handleDepositCoinSuccess', e.toString());
      }
    } else {
      wallet.transfer(system_address, amount, NB_BLOCKS).then((success) => {
        console.log('transfer', success);

        const { data } = success;

        if (data) {
          const { hash: txHash } = data;
          this.trackingDeposit(id, txHash, currency, status, '');
        } else {
          this.trackingDeposit(id, '', currency, status, '');
        }
      }).catch((e) => {
        // TO-DO: handle error
        console.log('transfer', e);
        this.trackingDeposit(id, '', currency, status, e.toString());
      });
    }

    this.props.showAlert({
      message: <div className="text-center"><FormattedMessage id="escrow.btn.depositSuccessMessage" /></div>,
      timeOut: 2000,
      type: 'success',
      // callBack: this.handleBuySuccess,
    });
  };

  handleBuySuccess = () => {
    const { callbackSuccess } = this.props;

    if (callbackSuccess) {
      callbackSuccess();
    } else {
      this.props.history.push(URL.HANDSHAKE_ME);
    }
  };

  handleDepositCoinFailed = (e) => {
    this.hideLoading();

    this.props.showAlert({
      message: <div className="text-center">{getErrorMessageFromCode(e)}</div>,
      timeOut: 3000,
      type: 'danger',
      callBack: this.handleBuyFailed,
    });
  };

  showLoading = () => {
    this.props.showLoading({ message: '' });
  };

  hideLoading = () => {
    this.props.hideLoading();
  };

  handleBuyFailed = () => {
    // this.modalRef.close();

    const { callbackFailed } = this.props;

    if (callbackFailed) {
      callbackFailed();
    }
  };

  render() {
    const { messages } = this.props.intl;
    const { intl, hideNavigationBar } = this.props;
    const { listOfferPrice } = this.props;

    return (
      <div className="escrow-deposit">
        <div>
          <button className="btn btn-lg bg-transparent d-inline-block btn-close">
            &times;
          </button>
        </div>
        <div className="wrapper">
          <h4>
            <FormattedMessage id="escrow.label.depositCoin" />
          </h4>
          <div>
            <FormEscrowDeposit onSubmit={this.handleOnSubmit} validate={this.handleValidate}>
              <div>
                <div className="d-inline-block escrow-label" style={{ width: '140px' }}>
                  <FormattedMessage id="escrow.label.iWantTo" />
                </div>
                <div className="d-inline-block escrow-label" style={{ width: '70px' }}>
                  %
                </div>
                <div className="d-inline-block escrow-label" style={{ minWidth: '130px' }}>
                  <FormattedMessage id="escrow.label.price" />
                </div>
              </div>
              {listCurrency.map(coin => {
                const { name, icon } = coin;

                const offerPrice = listOfferPrice && listOfferPrice.find((item) => {
                  const { type, currency, fiatCurrency } = item;
                  return type === EXCHANGE_ACTION.SELL && currency === name && fiatCurrency === FIAT_CURRENCY.USD;
                });

                const fiatCurrency = offerPrice && offerPrice.price || 0;

                return (
                  <div key={name} className="mt-2">
                    <div className="d-inline-block pr-2" style={{ width: '140px' }}>
                      <div style={{ position: 'relative' }}>
                        <Field
                          name={`amount_${name}`}
                          className="form-control form-deposit-custom"
                          type="text"
                          component={fieldInput}
                          elementPrepend={
                            <img src={icon} className="icon-deposit" />
                          }
                          validate={[number]}
                        />
                      </div>
                    </div>
                    <div className="d-inline-block pr-2" style={{ width: '70px' }}>
                      <div style={{ position: 'relative' }}>
                        <Field
                          name={`percentage_${name}`}
                          className="form-control pr-4"
                          type="tel"
                          component={fieldInput}
                          elementAppend={
                            <span className="percentage-symbol escrow-label font-weight-normal">%</span>
                          }
                          validate={[number]}
                        />
                      </div>
                    </div>
                    <div className="d-inline-block pl-2 bg-light rounded" style={{ minWidth: '130px', lineHeight: '38px' }}>
                      <span className="font-weight-normal">{formatMoneyByLocale(fiatCurrency, FIAT_CURRENCY.USD)}</span>
                      <span className="escrow-label float-right mr-2 font-weight-normal">{`${FIAT_CURRENCY.USD}/${name}`}</span>
                    </div>
                  </div>
                );
              })}
              <div className="mt-3">
                <div className="w-75 d-inline-block align-middle">
                  <div className="font-weight-normal"><FormattedMessage id="escrow.label.yourSellingPrice" /></div>
                  <div className="escrow-label">
                    <FormattedMessage id="escrow.label.sellingPriceCaption" />
                  </div>
                </div>
                {/*<div className="w-25 d-inline-block align-middle">*/}
                  {/*<div style={{ position: 'relative' }}>*/}
                    {/*<Field*/}
                      {/*name="percentage"*/}
                      {/*className="form-control pr-4"*/}
                      {/*type="tel"*/}
                      {/*component={fieldInput}*/}
                      {/*elementAppend={*/}
                        {/*<span className="percentage-symbol escrow-label font-weight-normal">%</span>*/}
                      {/*}*/}
                      {/*validate={[number, required]}*/}
                    {/*/>*/}
                  {/*</div>*/}
                {/*</div>*/}
              </div>
              <div className="mt-3">
                <button type="submit" className="btn btn-primary btn-block">
                  <img src={iconLock} width={16} className="align-top mr-2" />
                  <FormattedMessage id="escrow.btn.depositNow" />
                </button>
              </div>
            </FormEscrowDeposit>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  listOfferPrice: state.exchange.listOfferPrice,
  authProfile: state.auth.profile,
  app: state.app,
  percentage: selectorFormEscrowDeposit(state, 'percentage'),
  depositInfo: state.exchange.depositInfo,
});

const mapDispatch = dispatch => ({
  rfChange: bindActionCreators(change, dispatch),
  showAlert: bindActionCreators(showAlert, dispatch),
  showLoading: bindActionCreators(showLoading, dispatch),
  hideLoading: bindActionCreators(hideLoading, dispatch),
  getCreditATM: bindActionCreators(getCreditATM, dispatch),
  createCreditATM: bindActionCreators(createCreditATM, dispatch),
  depositCoinATM: bindActionCreators(depositCoinATM, dispatch),
  trackingDepositCoinATM: bindActionCreators(trackingDepositCoinATM, dispatch),
});

export default injectIntl(connect(mapState, mapDispatch)(EscrowDeposit));