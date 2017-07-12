import React from 'react';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base'

export default class Link extends React.Component {
  logout() {
    Accounts.logout();
  }

  render() {
    return (
      <div>
        <h2>Link Component here!</h2>
        <button onClick={this.logout.bind(this)}>Logout</button>
      </div>
    );
  }
};

Link.proptypes = {};