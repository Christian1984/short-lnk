import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

export default class Login extends React.Component {
  render() {
    return (
      <div>
        <h2>Login to Short Lnk</h2>
        <div>//TODO: login form goes here!</div>
        <div>Don't have an Account yet? <Link to='/signup'>Signup here!</Link></div>
      </div>
    );
  }
};

Login.proptypes = {};