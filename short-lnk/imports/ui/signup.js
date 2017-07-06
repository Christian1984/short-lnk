import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0
    };
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

  countDown() {
    this.setState({
      count: this.state.count - 1
    },
    () => {
      console.log('countDown-callback called');
      console.log(this.state.count);
    });
  }

  render() {
    return (
      <div>
        <h2>Signup For a New Short Lnk Account</h2>
        <div>//TODO: signup form goes here!</div>
        <div>
          <span>Counter: </span>
          <span>{this.state.count}</span>
          <button onClick={this.countDown.bind(this)}>-1</button>
          <button onClick={this.countUp.bind(this)}>+1</button>
        </div>
        <div>Already have an Account yet? <Link to='/'>Login here!</Link></div>
      </div>
    );
  }
};

Signup.proptypes = {};