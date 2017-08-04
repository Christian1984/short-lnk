import React from 'react';
import PropTypes from 'prop-types';

import { Accounts } from 'meteor/accounts-base';

export default class PrivateHeader extends React.Component {
  onLogoutClick() {
    Accounts.logout();
  }

  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <button onClick={this.onLogoutClick.bind(this)}>Logout</button>
      </div>
    );
  }
}

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired
}