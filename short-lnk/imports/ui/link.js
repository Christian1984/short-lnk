import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';

export default class Link extends React.Component {
  logout() {
    browserHistory.push('/');
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