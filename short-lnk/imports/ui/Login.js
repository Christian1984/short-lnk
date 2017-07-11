import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';

export default class Login extends React.Component {
  onSubmit(e) {
    e.preventDefault();
    
    let u = e.target.email.value.trim();
    let p = e.target.password.value;
    Meteor.loginWithPassword(u, p, (err) => {console.log(err)});
  }

  render() {
    return (
      <div>
        <h2>Login to your Short Lnk Account</h2>
        <form onSubmit={this.onSubmit.bind(this)}>
          <div>
            <input type='email' name='email' placeholder='Email' />
          </div>
          <div>
            <input type='password' name='password' placeholder='Password' />
          </div>
          <button>Login</button>
        </form>
        <div>Don't have an Account yet? <Link to='/signup'>Signup here!</Link></div>
      </div>
    );
  }
};

Login.proptypes = {};