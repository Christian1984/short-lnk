import React from 'react';
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
      <div className='boxed-view'>
        <div className='boxed-view__box'>
          <h1>Login to Short Lnk</h1>
          {this.state.error ? <div>Error: {this.state.error}</div> : undefined}
          {this.state.success ? <div>Success!</div> : undefined}
          <form className='boxed-view__form' onSubmit={this.onSubmit.bind(this)}>
            <input type='text' name='email' placeholder='Email' />
            <input type='password' name='password' placeholder='Password' />
            <button>Login</button>
          </form>
          <div>Don't have an Account yet? <Link to='/signup'>Signup here!</Link></div>
        </div>
      </div>
    );
  }
};