import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      passwordOkay: false
    };
  }

  onSubmit(e) {
    e.preventDefault();

    let email = e.target.email.value;
    let password = e.target.password.value;

    Accounts.createUser({
      email, password
    }, (err) => {
      if (!err) {
        console.log('user created successfully')
      } 
      else {
        this.setState({
          error: 'something went wrong: ' + err.message
        });

        console.log(err);
      }
    });
  }

  checkPassword(e) {
    let pw = e.target.value;
    console.log(pw.length);

    if (pw.length <= 6) {
      this.setState ({passwordOkay: false});
    }
    else {
      this.setState ({passwordOkay: true});
    }
  }

  countUp() {
    //this.state.count++; DOES NOT WORK
    this.setState({
      count: this.state.count + 1
    },
    () => {
      console.log('countUp-callback called');
      console.log(this.state.count);
    });
  }

  render() {
    return (
      <div>
        <h2>Signup For a New Short Lnk Account</h2>
        {this.state.error ? <div>Error: {this.state.error}</div> : undefined}
        <form onSubmit={this.onSubmit.bind(this)}>
          <div>
            <input type='email' name='email' placeholder='Your Best Email' />
          </div>
          <div>
            <input type='password' name='password' placeholder='Password' onChange={this.checkPassword.bind(this)} />
            {!this.state.passwordOkay ? <span>password should be at least 6 characters long</span> : undefined}
          </div>
          <button disabled={!this.state.passwordOkay}>Create Account</button>
        </form>
        <div>Already have an Account yet? <Link to='/'>Login here!</Link></div>
      </div>
    );
  }
};

Signup.proptypes = {};