import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withFirebase } from 'react-redux-firebase';
// action, mock
import { fireBaseExchangeDataChange, loadMyHandshakeList, fireBaseBettingChange } from '@/reducers/me/action';
import { API_URL, APP, HANDSHAKE_ID, URL } from '@/constants';
import { injectIntl } from 'react-intl';

// components
import { Link } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import NoData from '@/components/core/presentation/NoData';
import { getDashboardInfo, getListOfferPrice, getOfferStores, reviewOffer } from '@/reducers/exchange/action';
import FeedPromise from '@/components/handshakes/promise/Feed';
import FeedBetting from '@/components/handshakes/betting/Feed';
import FeedExchange from '@/components/handshakes/exchange/Feed/FeedMe';
import FeedSeed from '@/components/handshakes/seed/Feed';
import ModalDialog from '@/components/core/controls/ModalDialog';
import Image from '@/components/core/presentation/Image';

import ToggleSwitch from '@/components/core/presentation/ToggleSwitch';
// style
import AvatarSVG from '@/assets/images/icon/avatar.svg';
import ShopSVG from '@/assets/images/icon/icons8-shop_filled.svg';
import ExpandArrowSVG from '@/assets/images/icon/expand-arrow.svg';
import { setOfflineStatus } from '@/reducers/auth/action';
import local from '@/services/localStore';
import { fieldRadioButton } from '@/components/core/form/customField'
import createForm from '@/components/core/form/createForm'

import Helper from '@/services/helper';
import Rate from '@/components/core/controls/Rate/Rate';

import './Me.scss';
import {change, Field} from 'redux-form'
import {HANDSHAKE_ID_DEFAULT} from "@/constants";
import {bindActionCreators} from "redux";

const TAG = 'Me';
const maps = {
  [HANDSHAKE_ID.PROMISE]: FeedPromise,
  [HANDSHAKE_ID.BETTING]: FeedBetting,
  [HANDSHAKE_ID.EXCHANGE]: FeedExchange,
  [HANDSHAKE_ID.EXCHANGE_LOCAL]: FeedExchange,
  [HANDSHAKE_ID.SEED]: FeedSeed,
};

const CASH_TAB = {
  TRANSACTION: 'TRANSACTION',
  DASHBOARD: 'DASHBOARD',
};

const CATEGORIES = [{
  value: HANDSHAKE_ID.BETTING,
  text: 'Prediction',
  priority: 0,
},
  {
    value: HANDSHAKE_ID.EXCHANGE,
    text: 'Cash',
    priority: 2,
  },
];

const nameFormFilterFeeds = 'formFilterFeeds';
const FormFilterFeeds = createForm({
  propsReduxForm: {
    form: nameFormFilterFeeds,
  },
});

class Me extends React.Component {
  static propTypes = {
    app: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    me: PropTypes.object.isRequired,
    loadMyHandshakeList: PropTypes.func.isRequired,
    getListOfferPrice: PropTypes.func.isRequired,
    firebaseUser: PropTypes.any.isRequired,
    history: PropTypes.object.isRequired,
    fireBaseExchangeDataChange: PropTypes.func.isRequired,
    fireBaseBettingChange: PropTypes.func.isRequired,
    exchange: PropTypes.object.isRequired,
    setOfflineStatus: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    const { s, sh } = Helper.getQueryStrings(window.location.search);
    const handshakeDefault = this.getDefaultHandShakeId();

    const initUserId = s;
    const offerId = sh;

    this.state = {
      initUserId,
      offerId,
      exchange: this.props.exchange,
      auth: this.props.auth,
      firebaseUser: this.props.firebaseUser,
      numStars: 0,
      offerStores: this.props.offerStores,
      modalContent: <div />, // type is node
      propsModal: {
        // className: "discover-popup",
        // isDismiss: false
      },
      cashTab: CASH_TAB.TRANSACTION,
      handshakeIdActive: handshakeDefault,
    };
  }

  getDefaultHandShakeId() {
    if (window.location.pathname.indexOf(URL.HANDSHAKE_CASH) >= 0) {
      return HANDSHAKE_ID.EXCHANGE;
    }
    let seletedId = HANDSHAKE_ID_DEFAULT;
    let { id } = Helper.getQueryStrings(window.location.search);
    id = parseInt(id, 10);
    if (id && Object.values(HANDSHAKE_ID).indexOf(id) !== -1) {
      seletedId = id;
    }
    return seletedId;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(TAG, ' getDerivedStateFromProps begin ');
    if (nextProps.exchange.listOfferPrice.updatedAt !== prevState.exchange.listOfferPrice.updatedAt) {
      nextProps.loadMyHandshakeList({ PATH_URL: API_URL.ME.BASE });
      return { exchange: nextProps.exchange };
    }
    console.log(TAG, ' getDerivedStateFromProps begin firebaseUser = ', nextProps.firebaseUser);
    if (nextProps.firebaseUser) {
      console.log(TAG, ' getDerivedStateFromProps begin 01');
      if (JSON.stringify(nextProps.firebaseUser) !== JSON.stringify(prevState.firebaseUser)) {
        const nextUser = nextProps.firebaseUser.users?.[nextProps.auth.profile.id];
        const prevUser = prevState.firebaseUser.users?.[prevState.auth.profile.id];
        console.log(TAG, ' getDerivedStateFromProps begin 02');
        if (nextUser) {
          console.log(TAG, ' getDerivedStateFromProps begin 03');
          if (JSON.stringify(nextUser?.offers) !== JSON.stringify(prevUser?.offers)) {
            nextProps.fireBaseExchangeDataChange(nextUser?.offers);
            nextProps.firebase.remove(`/users/${nextProps.auth.profile.id}/offers`);
          }
          console.log(TAG, ' getDerivedStateFromProps begin 04');
          if (JSON.stringify(nextUser?.betting) !== JSON.stringify(prevUser?.betting)) {
            console.log(TAG, ' getDerivedStateFromProps betting ',nextUser?.betting);
            nextProps.fireBaseBettingChange(nextUser?.betting);
            nextProps.firebase.remove(`/users/${nextProps.auth.profile.id}/betting`);
          }
        }

        return { firebaseUser: nextProps.firebaseUser };
      }
    }
    if (nextProps.auth.updatedAt !== prevState.auth.updatedAt) {
      return { auth: nextProps.auth };
    }

    if (nextProps.offerStores) {
      if (JSON.stringify(nextProps.offerStores) !== JSON.stringify(prevState.offerStores)) {
        return { offerStores: nextProps.offerStores };
      }
    }
    return null;
  }

  componentDidMount() {
    const { initUserId, offerId, handshakeIdActive } = this.state;
    const { rfChange } = this.props;
    if (initUserId && offerId) {
      this.rateRef.open();
    }

    rfChange(nameFormFilterFeeds, 'feedType', handshakeIdActive);

    this.loadMyHandshakeList();
    this.getOfferStore();
    this.getDashboardInfo();
  }

  setOfflineStatus = (online) => {
    const offlineValue = online ? 0 : 1;
    this.props.setOfflineStatus({
      PATH_URL: `${API_URL.ME.SET_OFFLINE_STATUS}/${offlineValue}`,
      METHOD: 'POST',
      successFn: this.handleSetOfflineStatusSuccess,
      errorFn: this.handleSetOfflineStatusFailed,
    });
  }

  getOfferStore = () => {
    const { authProfile } = this.props;
    this.props.getOfferStores({
      PATH_URL: `${API_URL.EXCHANGE.OFFER_STORES}/${authProfile.id}`,
    });
  }

  getDashboardInfo = () => {
    this.props.getDashboardInfo({
      PATH_URL: `${API_URL.EXCHANGE.GET_DASHBOARD_INFO}`,
    });
  }

  handleCreateExchange = () => {
    this.props.history.push(`${URL.HANDSHAKE_CREATE}?id=${HANDSHAKE_ID.EXCHANGE}`);
  }

  loadMyHandshakeList = () => {
    const qs = { };
    const {
      handshakeIdActive,
    } = this.state;

    if (handshakeIdActive) {
      qs.type = handshakeIdActive;
    }
    this.props.loadMyHandshakeList({ PATH_URL: API_URL.ME.BASE, qs, });
  }

  handleSetOfflineStatusSuccess = () => {
    const { offline } = this.props.auth;
    local.save(APP.OFFLINE_STATUS, offline ? 1 : 0);
  }

  handleSetOfflineStatusFailed = (e) => {
    console.log('handleSetOfflineStatusFailed', e);
  }

  // Review offer when receive notification after shop complete
  handleOnClickRating = (numStars) => {
    this.setState({ numStars });
  }

  handleSubmitRating = () => {
    this.rateRef.close();
    const { offerId, initUserId } = this.state;
    this.props.reviewOffer({
      PATH_URL: `${API_URL.EXCHANGE.OFFER_STORES}/${initUserId}/${API_URL.EXCHANGE.REVIEWS}/${offerId}`,
      METHOD: 'POST',
      qs: { score: this.state.numStars },
      successFn: this.handleReviewOfferSuccess,
      errorFn: this.handleReviewOfferFailed,
    });
  }

  handleReviewOfferSuccess = (responseData) => {
    console.log('handleReviewOfferSuccess', responseData);
    const data = responseData.data;
  }

  handleReviewOfferFailed = (e) => {
  }

  handleShowModalDialog = (modalProps) => {
    const { show, propsModal, modalContent = <div /> } = modalProps
    this.setState({
      modalContent,
      propsModal
    }, () => {
      if (show) {
        this.modalRef.open();
      } else {
        this.modalRef.close();
      }
    })
  }

  onCategoryChange = (e, newValue) => {
    const { rfChange } = this.props;
    console.log('onCategoryChange', newValue);
    this.setState({ handshakeIdActive: newValue }, () => {
      if (this.state.handshakeIdActive === HANDSHAKE_ID.EXCHANGE) {
        this.setState({ cashTab: CASH_TAB.TRANSACTION }, () => {
          rfChange(nameFormFilterFeeds, 'cash-show-type', CASH_TAB.TRANSACTION);
        });
      }
      this.loadMyHandshakeList();
    });
  }

  onCashTabChange = (e, newValue) => {
    console.log('onTypeChange', newValue);
    this.setState({cashTab: newValue}, () => {
      this.loadMyHandshakeList();
      if (newValue === CASH_TAB.DASHBOARD) {
        // this.getOfferStore();
        this.getDashboardInfo();
      }
    });
  }

  render() {
    const { list, listDashboard } = this.props.me;
    let listFeed = [];
    if (this.state.handshakeIdActive === HANDSHAKE_ID.EXCHANGE && this.state.cashTab === CASH_TAB.DASHBOARD) {
      listFeed = listDashboard;
    } else {
      listFeed = list;
    }
    const { messages } = this.props.intl;
    const { offerStores, propsModal, modalContent } = this.state;
    const online = !this.props.auth.offline;
    const haveOffer = offerStores ? (offerStores.itemFlags.ETH || offerStores.itemFlags.BTC) : false;

    return (
      <Grid className="me">
        <Row>
          <Col md={12}>
            <Link className="update-profile" to={URL.HANDSHAKE_ME_PROFILE} title="profile">
              <Image className="avatar" src={AvatarSVG} alt="avatar" />
              <div className="text">
                <strong>{messages.me.feed.profileTitle}</strong>
                <p>{messages.me.feed.profileDescription}</p>
              </div>
              <div className="arrow">
                <Image src={ExpandArrowSVG} alt="arrow" />
              </div>
            </Link>
          </Col>
        </Row>
        <Row onClick={!haveOffer ? this.handleCreateExchange : undefined}>
          <Col md={12}>
            <div className="update-profile pt-2">
              <Image className="avatar" src={ShopSVG} alt="shop" />
              <div className="text" style={{ width: '69%' }}>
                <strong>{messages.me.feed.shopTitle}</strong>
                {haveOffer ?
                  (<p>{messages.me.feed.shopDescription}</p>) :
                  (<p>{messages.me.feed.shopNoDataDescription}</p>)
                }
              </div>
              {haveOffer && (<div className="arrow">
                <ToggleSwitch defaultChecked={online} onChange={flag => this.setOfflineStatus(flag)}/>
              </div>)
              }
            </div>
          </Col>
        </Row>

        <div className="my-3">
          <FormFilterFeeds>
            <div className="d-table w-100">
              <div className="d-table-cell"><label className="label-filter-by">Filter by:</label></div>
              <div className="d-table-cell">
                <Field
                  name="feedType"
                  component={fieldRadioButton}
                  type="tab-5"
                  list={CATEGORIES}
                  // validate={[required]}
                  onChange={this.onCategoryChange}
                />
              </div>
            </div>

            { this.state.handshakeIdActive === HANDSHAKE_ID.EXCHANGE && (
              <div>
                <hr />
                <div>
                  <Field
                    name="cash-show-type"
                    component={fieldRadioButton}
                    type="tab-6"
                    list={[
                      { value: CASH_TAB.TRANSACTION, text: 'Transactions', icon: <span className="icon-transactions align-middle" /> },
                      { value: CASH_TAB.DASHBOARD, text: 'Dashboard', icon: <span className="icon-dashboard align-middle" /> },
                    ]}
                    // validate={[required]}
                    onChange={this.onCashTabChange}
                  />
                </div>
              </div>
              )
            }

          </FormFilterFeeds>
        </div>

        <Row>
          <Col md={12} className="me-main-container">
            {
            listFeed && listFeed.length > 0 ? (
              listFeed.map((handshake) => {
                  const FeedComponent = maps[handshake.type];
                  if (FeedComponent) {
                    return (
                      <Col key={handshake.id} className="feed-wrapper">
                        <FeedComponent
                          {...handshake}
                          history={this.props.history}
                          onFeedClick={() => {}}
                          onShowModalDialog={this.handleShowModalDialog}
                          mode="me"
                          refreshPage={this.loadMyHandshakeList}
                        />
                      </Col>
                    );
                  }
                  return null;
                })
              ) : (
                <NoData message={messages.me.feed.noDataMessage} isShowArrowDown />
              )
            }
          </Col>
        </Row>
        <Rate onRef={e => this.rateRef = e} startNum={5} onSubmit={this.handleSubmitRating} ratingOnClick={this.handleOnClickRating} />
        <ModalDialog onRef={(modal) => { this.modalRef = modal; return null; }} {...propsModal}>
          {modalContent}
        </ModalDialog>
      </Grid>
    );
  }
}

const mapState = state => ({
  me: state.me,
  app: state.app,
  auth: state.auth,
  firebaseUser: state.firebase.data,
  firebaseApp: state.firebase,
  exchange: state.exchange,
  authProfile: state.auth.profile,
  offerStores: state.exchange.offerStores,
});

const mapDispatch = (dispatch) => ({
  rfChange: bindActionCreators(change, dispatch),
  loadMyHandshakeList: bindActionCreators(loadMyHandshakeList, dispatch),
  getListOfferPrice: bindActionCreators(getListOfferPrice, dispatch),
  fireBaseExchangeDataChange: bindActionCreators(fireBaseExchangeDataChange, dispatch),
  fireBaseBettingChange: bindActionCreators(fireBaseBettingChange, dispatch),
  setOfflineStatus: bindActionCreators(setOfflineStatus, dispatch),
  reviewOffer: bindActionCreators(reviewOffer, dispatch),
  getOfferStores: bindActionCreators(getOfferStores, dispatch),
  getDashboardInfo: bindActionCreators(getDashboardInfo, dispatch),
});

export default injectIntl(compose(withFirebase, connect(mapState, mapDispatch))(Me));
