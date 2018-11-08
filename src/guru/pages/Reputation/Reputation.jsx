import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import qs from 'querystring';
import { connect } from 'react-redux';
import Image from '@/components/core/presentation/Image';
import DefaultAvatar from '@/assets/images/icon/logo.svg';
import { loadUserEvents, loadUserReputation } from '@/guru/pages/Home/action';
import { userEventsSelector, userReputationSelector } from '@/guru/pages/Home/selector';
import { formatAmount } from '@/components/handshakes/betting/utils';
import { shortAddress } from '@/utils/string';


import './Reputation.scss';
import EventItem from './EventItem';

class Reputation extends React.Component {
  static propTypes = {
    eventList: PropTypes.array,
    reputation: PropTypes.object,
  };

  static defaultProps = {
    eventList: [],
    reputation: {},
  };
  componentDidMount() {
    this.getData(this.props);
  }
  getData = (props) => {
    const querystring = window.location.search.replace('?', '');
    const querystringParsed = qs.parse(querystring);
    const userId = props.location.id;
    console.log('UserId :', props.location.id);
    console.log('Querry Parse:', querystringParsed);
    props.dispatch(loadUserEvents({ userId }));
    props.dispatch(loadUserReputation({ userId }));
  }

  renderProfile(props) {
    const firstEvent = props.eventList[0] || undefined;
    let creatorAddress = firstEvent ? firstEvent.creator_wallet_address : '';
    if (creatorAddress && creatorAddress.length > 0) {
      creatorAddress = shortAddress(creatorAddress, '...');
    }
    return (
      <div className="wrapperProfile">
        <div className="wrapperAvatar">
          <Image src={DefaultAvatar} alt="Avatar" width="50" />
        </div>
        <div className="wrapperContent">
          <div className="mediumText boldText">{creatorAddress}</div>
        </div>
      </div>
    );
  }
  renderMarketNumber(reputation) {
    const { total_events: totalEvents = 0 } = reputation;
    return (
      <div className="wrapperGroupBlock">
        <div className="mediumText boldText">{totalEvents}</div>
        <div className="disableText normalText">Debates</div>
      </div>
    );
  }
  renderETHNumber(reputation) {
    const { total_amount: totalAmount = 0 } = reputation;
    return (
      <div className="wrapperGroupBlock">
        <div className="mediumText boldText">{formatAmount(totalAmount)}</div>
        <div className="disableText normalText">ETH played</div>
      </div>
    );
  }
  renderDisputeNumber(reputation) {
    const { total_disputed_events: totalDisputedEvent = 0 } = reputation;
    return (
      <div className="wrapperGroupBlock">
        <div className="mediumText boldText">{totalDisputedEvent}</div>
        <div className="disableText normalText">Disputes</div>
      </div>
    );
  }
  renderGroupNumber(props) {
    const { reputation } = props;
    return (
      <div className="wrapperGroupNumber">
        {this.renderMarketNumber(reputation)}
        {this.renderETHNumber(reputation)}
        {this.renderDisputeNumber(reputation)}
      </div>
    );
  }
  renderMarketList(props) {
    return (
      <div className="wrapperMarketList">
        <div className="mediumText boldText">Hosted Debates</div>
        {props.eventList.map((event) => {
          return (
            <EventItem
              key={event.id}
              event={event}
            />
          );
        })}
      </div>
    );
  }
  render() {
    return (
      <div className="wrapperReputation">
        {this.renderProfile(this.props)}
        {this.renderGroupNumber(this.props)}
        {this.renderMarketList(this.props)}
      </div>
    );
  }
}
export default injectIntl(connect(
  (state) => {
    return {
      eventList: userEventsSelector(state),
      reputation: userReputationSelector(state),
    };
  },
)(Reputation));
