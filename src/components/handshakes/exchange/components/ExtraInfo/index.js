import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

class ExtraInfo extends Component {
  constructor() {
    super();
    this.state = { show: false };

    this.toggle = :: this.toggle;
  }

  toggle(show) {
    this.setState({ show: show === undefined ? !this.state.show : show });
  }

  render() {
    const { show } = this.state;
    const { info, className } = this.props;
    return (
      <div className={`extra-info-container ${className}`}>
        <button className="extra-info-icon" onClick={() => this.toggle()} onBlur={() => this.toggle(false)}>?</button>
        <div className={`extra-info-data ${show && 'show'}`}>{info}</div>
      </div>
    );
  }
}

ExtraInfo.defaultProps = {
  className: '',
};

ExtraInfo.propTypes = {
  info: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default ExtraInfo;
