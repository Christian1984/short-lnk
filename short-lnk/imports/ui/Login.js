import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      success: false,
      passwordOkay: false
    };
  }

  onSubmit(e) {
    e.preventDefault();
    
    let email = e.target.email.value.trim();
    let pw = e.target.password.value.trim();

    Meteor.loginWithPassword({email}, pw, (err) => {
      console.log(err);

      if (err) {
        this.setState({
          error: 'Unable to login. Check Email and Password!', //err.reason, 
          success: false
        });
        return;
      }
      
      this.setState({error: '', success: true});
    });
  }

  render() {
    return (
      <div>
        <h2>Login to your Short Lnk Account</h2>
        {this.state.error ? <div>Error: {this.state.error}</div> : undefined}
        {this.state.success ? <div>Success!</div> : undefined}
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