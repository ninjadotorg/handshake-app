import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// action, mock
import { injectIntl } from 'react-intl';
// components
// style
import createForm from '@/components/core/form/createForm';
import { change } from 'redux-form';
import { API_URL, HANDSHAKE_ID } from '@/constants';

import TransactionItem from './TransactionItem';
import AtmCashTransferInfo from '@/components/handshakes/exchange/AtmCashTransferInfo';
import Modal from '@/components/core/controls/Modal/Modal';
import { getTransactionNinjaCoin } from '@/reducers/exchange/action';
import { buyCryptoGetBankInfo } from '@/reducers/buyCoin/action';

const nameFormTransaction = 'formTransaction';
const FormTransaction = createForm({
  propsReduxForm: {
    form: nameFormTransaction,
  },
});

class Transaction extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalContent: '',
      modalTitle: '',
    };
  }

  componentDidMount() {
    const { country } = this.props;
    this.getTransactionNinjaCoin();

    this.getBankInfoFromCountry(); // global bank by default
    this.getBankInfoFromCountry(country);
  }

  getTransactionNinjaCoin = () => {
    this.props.getTransactionNinjaCoin({
      PATH_URL: API_URL.ME.BASE,
      qs: {
        type: HANDSHAKE_ID.EXCHANGE,
      },
    });
  }

  getBankInfoFromCountry = (country = 'XX') => {
    this.props.buyCryptoGetBankInfo({
      PATH_URL: `${API_URL.EXCHANGE.BUY_CRYPTO_GET_BANK_INFO}/${country}`,
    });
  }

  closeModal = () => {
    this.setState({ modalContent: '' });
  }

  onReceiptSaved = () => {
    // get new data from server
    this.getTransactionNinjaCoin();
    this.modalRef.close();
  }

  openNewTransaction = (transaction = {}) => {
    const { messages } = this.props.intl;
    const { bankInfo, country } = this.props;
    let bankData = {};
    const receipt = {
      createdAt: transaction.createdAt,
      amount: transaction.fiatAmount || 0,
      // customerAmount: +transaction.fiatAmount,
      // amount: (+transaction.fiatAmount - +transaction.storeFee) || 0,
      fiatCurrency: transaction.fiatCurrency,
      referenceCode: transaction.refCode,
      status: transaction.status,
      id: transaction.id,
    };

    // if fiatAmount over limit => use global bank, else local bank
    if (this.isOverLimit(receipt.amount)) {
      bankData = bankInfo.XX; // global bank
    } else {
      bankData = bankInfo[country] || bankInfo.XX;
      receipt.amount = transaction.fiatLocalAmount;
      receipt.fiatCurrency = transaction.fiatLocalCurrency;
    }
    this.setState({
      modalTitle: messages.atm_cash_transfer_info.title,
      modalContent: (
        <AtmCashTransferInfo
          receipt={receipt}
          bankInfo={bankData}
          saveReceiptHandle={this.saveReceiptHandle}
          onDone={this.onReceiptSaved}
        />
      ),
    }, () => {
      this.modalRef.open();
    });
  }

  isOverLimit = (amountInUsd) => {
    const { coinInfo } = this.props;
    const amount = amountInUsd || coinInfo?.fiatAmount;
    return Number.parseFloat(amount) > Number.parseFloat(coinInfo?.limit);
  }

  renderTransactionList = () => {
    const { buyCoinTransaction, intl: { messages } } = this.props;

    if (buyCoinTransaction && buyCoinTransaction.length === 0) {
      return (
        <div className="empty-list">
          <span>{messages.create.atm.text.no_history}</span>
        </div>
      );
    }

    return (
      <div>
        {
          buyCoinTransaction && buyCoinTransaction.map(transaction => {
            const { id } = transaction;
            return (
              <TransactionItem key={id} {...transaction} onShowTransferInfo={this.openNewTransaction} />
            );
          })
        }
      </div>
    );
  }

  render() {
    const { buyCoinTransaction } = this.props;
    const { modalContent, modalTitle } = this.state;

    return (
      <div className="transaction-container mt-4">
        {this.renderTransactionList()}
        <Modal title={modalTitle} onRef={modal => this.modalRef = modal} onClose={this.closeModal}>
          {modalContent}
        </Modal>
      </div>
    );
  }
}

const mapState = state => ({
  buyCoinTransaction: state.exchange.buyCoinTransaction,
  country: state.app.ipInfo.country,
  bankInfo: state.buyCoin?.bankInfo,
  coinInfo: state.buyCoin?.coinInfo || {},
});

const mapDispatch = dispatch => ({
  rfChange: bindActionCreators(change, dispatch),
  getTransactionNinjaCoin: bindActionCreators(getTransactionNinjaCoin, dispatch),
  buyCryptoGetBankInfo: bindActionCreators(buyCryptoGetBankInfo, dispatch),
});

export default injectIntl(connect(mapState, mapDispatch)(Transaction));