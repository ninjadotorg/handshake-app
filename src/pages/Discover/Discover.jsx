import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// service, constant
import { load } from '@/reducers/discover/action';
// components
import { Grid, Row, Col } from 'react-bootstrap';
import Button from '@/components/core/controls/Button';
import Feed from '@/components/core/presentation/Feed';
import Modal from '@/components/core/controls/Modal';
import Searchbar from '@/components/core/controls/Searchbar';
import SearchBarContainer from '@/components/core/controls/SearchBarContainer';
import { handShakeList } from '@/data/shake.js';
// style
import './Discover.scss';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  get feedHtml() {
    return handShakeList.data.map(handShake => (
      <Col md={12} xs={12} key={handShake.id} className="feedWrapper">
        <Feed className="feed">
          <p className="description">{handShake.description}</p>
          <p className="email">{handShake.from_email}</p>
        </Feed>
        <Button block>Shake now</Button>
      </Col>
    ));
  }

  get searchBar() {
    return (
      <Col md={12} xs={12}>
        <SearchBarContainer />
      </Col>
    );
  }

  get categoryBar() {
    return null;
  }

  render() {
    return (
      <Grid>
        <Row>{this.searchBar}</Row>
        <Row>{this.categoryBar}</Row>
        <Row>{this.feedHtml}</Row>
      </Grid>
    );
  }
}

Dashboard.propTypes = {
  discover: PropTypes.object,
  load: PropTypes.func,
};

const mapState = state => ({
  discover: state.discover,
});

const mapDispatch = {
  load,
};

// export default Dashboard;
// export default connect(null, ({ load }))(Dashboard);
export default connect(mapState, mapDispatch)(Dashboard);
