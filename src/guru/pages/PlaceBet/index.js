import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import qs from 'querystring';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { isEmpty } from '@/utils/is';
import { formatAmount, parseBigNumber } from '@/utils/number';
import { possibleWinning } from '@/utils/calculate';
import { getBalance, getAddress, getChainIdDefaultWallet } from '@/utils/helpers';
import IconCoin from '@/assets/images/icon/icon-coin.svg';

// TODO: [Begin: Will be moving to another place]
import { URL, HANDSHAKE_ID } from '@/constants';
import { UserHabit } from '@/guru/stores/constant';
import { showAlert } from '@/reducers/app/action';
import OuttaMoney from '@/assets/images/modal/outtamoney.png';
import ModalDialog from '@/components/core/controls/ModalDialog';
import { MESSAGE } from '@/components/handshakes/betting/message';
import { BetHandshakeHandler } from '@/components/handshakes/betting/Feed/BetHandshakeHandler';
// TODO: [End: Will be moving to another place]

import { updateLoading, userHabit } from '@/guru/stores/action';
import { getMatchDetail, getGasPrice, getMatchOdd, initHandShake,
  checkCompareRedeemCode, removeRedeemCode } from './action';
import {
  queryStringSelector,
  eventSelector,
  isRedeemSelector,
  isSubscribeSelector,
  matchDetailSelector,
  gasPriceSelector,
  matchOddsSelector,
  handShakesSelector
} from './selector';
import { VALIDATE_CODE } from './constants';
import { validationBet, isExistMatchBet } from './validation';
import View from './View';

import './styles.scss';

class PlaceBet extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    queryStringURL: PropTypes.string,
    eventList: PropTypes.array,
    matchDetail: PropTypes.object,
    sideOdds: PropTypes.arrayOf(PropTypes.string),
    handShakes: PropTypes.object
  };

  static defaultProps = {
    eventList: [],
    queryStringURL: undefined,
    matchDetail: {},
    sideOdds: ['support', 'against'],
    handShakes: undefined
  };

  state = {
    betAmount: '',
    isUseRedeem: false
  };

  componentWillMount() {
    this.crossIndex();
  }

  componentDidMount() {
    const { props, getParams } = this;
    const eventId = parseInt(getParams(props).event_id, 10);
    const { dispatch } = props;
    dispatch(getMatchDetail({ eventId }));
    dispatch(getMatchOdd({ outcomeId: getParams(props).outcome_id }));
    dispatch(getGasPrice());
    this.userHabit(dispatch, eventId);
  }

  componentDidUpdate(prevProps) {
    const { handShakes } = this.props;
    if (handShakes && prevProps.handShakes !== handShakes) {
      const { match } = handShakes;
      if (match !== undefined) {
        const message = match
          ? MESSAGE.CREATE_BET_MATCH
          : MESSAGE.CREATE_BET_NOT_MATCH;
        this.alertBox({
          message,
          type: 'success',
          callBack: this.redirectIndex()
        });
      } else {
        this.handShakeHandler(handShakes);
      }
    }
  }

  componentWillUnmount() {
    this.props.dispatch(removeRedeemCode());
  }

  getParams = ({ queryStringURL }) => qs.parse(queryStringURL.slice(1));

  getSide = props => parseInt(this.getParams(props).side, 10);

  getOdds = () => {
    const { props, getSide } = this;
    const { matchOdds } = props;
    return (
      ((matchOdds && props.sideOdds[`${getSide(props) - 1}`]) &&
        matchOdds[props.sideOdds[`${getSide(props) - 1}`]][0].odds) ||
      0
    );
  };

  redirectIndex = () => {
    const redirectURL = `${URL.HANDSHAKE_PREDICTION}`;
    this.props.history.push(redirectURL);
  };

  crossIndex = () => {
    const { eventList } = this.props;
    if (isEmpty(eventList)) {
      this.redirectIndex();
    }
  };

  validate = async ({ amount }) => {
    const validate = await validationBet({ amount });
    return validate;
  };

  alertBox = ({ message, type, timeOut = 3000, callBack = () => {} }) => {
    const { dispatch } = this.props;
    const alertProps = {
      timeOut,
      type,
      callBack,
      message: <div className="text-center">{message}</div>
    };
    dispatch(showAlert(alertProps));
  };

  userHabit = (dispatch, eventId) => {
    dispatch(userHabit({ data: [{
      ids: [eventId],
      view_type: UserHabit.DETAIL
    }] }));
  };

  handShakeData = ({ amount, redeem }) => {
    const { getSide } = this;
    const { matchDetail, queryStringURL } = this.props;
    if (!matchDetail) return null;
    return {
      redeem,
      amount: parseBigNumber(amount),
      currency: 'ETH',
      type: HANDSHAKE_ID.BETTING,
      match_id: matchDetail.id,
      extra_data: JSON.stringify({
        event_name: matchDetail.name,
        event_predict: ['Yes', 'No'][getSide({ queryStringURL }) - 1]
      }),
      from_address: getAddress(),
      side: getSide({ queryStringURL }),
      chain_id: getChainIdDefaultWallet()
    };
  };

  handShakeSuccess = handshakes => {
    const message = isExistMatchBet(handshakes)
      ? MESSAGE.CREATE_BET_MATCH
      : MESSAGE.CREATE_BET_NOT_MATCH;
    return this.alertBox({
      message,
      type: 'success',
      callBack: this.redirectIndex()
    });
  };

  handleShakeFail = data => {
    const { message } = data;
    return this.alertBox({
      message,
      type: 'danger'
    });
  };

  handShakeHandler = async (data) => {
    const { status } = data;
    if (status) {
      const { handshakes } = data;
      const balance = await getBalance();
      const handler = BetHandshakeHandler.getShareManager();
      this.handShakeSuccess(handshakes);
      return handler.controlShake(handshakes, balance);
    }
    return this.handleShakeFail(data);
  };

  handleBet = async ({ values }) => {
    const { validate, alertBox, modalOuttaMoney, handShakeData, props } = this;
    // TODO: update gasPrice
    await getGasPrice();
    props.dispatch(updateLoading(true));
    
    const { status, message, code } = await validate(values);
    if (status) {
      this.userHabit(props.dispatch, handShakeData(values).match_id);
      return props.dispatch(initHandShake(handShakeData(values)));
    }
    if (message && code === VALIDATE_CODE.NOT_ENOUGH_BALANCE) {
      props.dispatch(updateLoading(false));
      return modalOuttaMoney.open();
    }
    props.dispatch(updateLoading(false));
    return alertBox({ message, type: 'danger' });
  };

  handleChange = ({ value, name }) => {
    if (name === 'amount') {
      return this.setState({ betAmount: value });
    }
    return this.props.dispatch(checkCompareRedeemCode({ redeem: value }));
  };

  calculatePosWinning = (props) => {
    const { state, getOdds } = this;
    let amountNo = state.betAmount;
    const betOdds = getOdds();
    if (props.redeem) {
      amountNo = props.redeem.amount;
    }
    return formatAmount(possibleWinning(amountNo, betOdds));
  };

  redeemInput = () => {
    this.setState({ isUseRedeem: true });
  };

  redeemNotice = (props, state) => {
    const { isUseRedeem } = state;
    if (!props.isRedeem || !props.isSubscribe || isUseRedeem) return null;
    return (
      <div className="Redeem">
        {/* {`You've already requested a redeem code. `} */}
        <span className="UseRedeem" onClick={this.redeemInput}>
          Use a redeem code
        </span>
      </div>
    );
  };

  betFormProps = (props, state) => {
    const { handleBet, handleChange, getSide } = this;
    return {
      handleBet,
      handleChange,
      amount: props.redeem ? props.redeem.amount || '' : '',
      redeem: props.redeem ? props.redeem.code || '' : '',
      side: getSide(props),
      isLoading: props.isLoading,
      buttonText: props.isLoading ? 'Loading...' : 'Predict',
      buttonClasses: classNames('btn btn-block', {
        'btn-primary': getSide(props) === 1,
        'btn-secondary': getSide(props) === 2
      }),
    };
  };

  betParamsProps = ({ matchDetail, gasPrice }) => ({
    iconCoin: IconCoin,
    possibleWinning: `${this.calculatePosWinning(this.props)} ETH`,
    gasPrice: `${formatAmount(gasPrice)} ETH`,
    marketFee: `${matchDetail.market_fee}%`,
    className: classNames('BetParamsComponent')
  });

  renderOuttaMoney = () => {
    return (
      <ModalDialog
        onRef={modal => {
          this.modalOuttaMoney = modal;
        }}
        className="outtaMoneyModal"
        close
      >
        <div className="outtaMoneyContainer">
          <img src={OuttaMoney} alt="" />
          <div className="outtaMoneyTitle">You're outta… money!</div>
          <div className="outtaMoneyMsg">
            To keep forecasting, you’ll need to top-up your wallet.
          </div>
        </div>
      </ModalDialog>
    );
  };

  renderComponent = (props, state) => {
    return (
      <div className="PlaceBetContainer">
        <View
          history={this.props.history}
          betFormProps={this.betFormProps(props, state)}
          betParamsProps={this.betParamsProps(props)}
        />
        {this.renderOuttaMoney()}
      </div>
    );
  };

  render() {
    return this.renderComponent(this.props, this.state);
  }
}

export default injectIntl(connect(
  (state) => {
    return {
      eventList: eventSelector(state),
      isLoading: state.guru.ui.isLoading,
      isSubscribe: isSubscribeSelector(state),
      isRedeem: isRedeemSelector(state),
      redeem: state.guru.ui.redeem,
      matchDetail: matchDetailSelector(state),
      queryStringURL: queryStringSelector(state),
      gasPrice: gasPriceSelector(state),
      matchOdds: matchOddsSelector(state),
      handShakes: handShakesSelector(state)
    };
  }
)(PlaceBet));
