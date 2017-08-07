import React from 'react';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

export default class Signup extends React.Component {
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
    let password = e.target.password.value.trim();

    if (password.length < 6) {
      //this.setState({err: 'Password must be at least 6 characters long!', success: false});
      //return;
    }

    Accounts.createUser({
      email, password
    }, (err) => {
      if (!err) {
        this.setState({
          error: '',
          success: true
        });
      } 
      else {
        this.setState({
          error: err.reason,
          success: false
        });
      }
    });
  }

  checkPassword(e) {
    let pw = e.target.value;
    console.log(pw.length);

    if (pw.length < 6) {
      //this.setState ({passwordOkay: false});
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
      <div className='boxed-view'>
        <div className='boxed-view__box'>
          <h1>Join Short Lnk</h1>
          {this.state.error ? <div>Error: {this.state.error}</div> : undefined}
          {this.state.success ? <div>Success!</div> : undefined}
          <form className='boxed-view__form' onSubmit={this.onSubmit.bind(this)}>
            <input type='text' name='email' placeholder='Your Best Email' />
            <input type='password' name='password' placeholder='Password' onChange={this.checkPassword.bind(this)} />
            {/*!this.state.passwordOkay ? <span>password should be at least 6 characters long</span> : undefined*/}
            <button disabled={!this.state.passwordOkay}>Create Account</button>
          </form>
          <div>Already have an Account? <Link to='/'>Login here!</Link></div>
        </div>
      </div>
    );
  }
};