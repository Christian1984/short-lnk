import React from 'react';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base'
import { LinksCollection } from './../api/Links';

//import LinkItem from './LinkItem';
import LinksList from './LinksList';

export default class Link extends React.Component {
  onLogoutClick() {
    Accounts.logout();
  }

  onFormSubmit(e) {
    e.preventDefault();

    url = this.refs.url.value;
    LinksCollection.insert({url});

    this.refs.url.value = '';
  }

  render() {
    return (
      <div>
        <h2>Link Component here!</h2>
        <LinksList />
        <p>Add Link</p>
        <form onSubmit={this.onFormSubmit.bind(this)}>
          <input type='text' name='url' ref='url' placeholder='URL' />
          <button>Submit</button>
        </form>
        <button onClick={this.onLogoutClick.bind(this)}>Logout</button>
      </div>
    );
  }
};

Link.proptypes = {
  links: PropTypes.array//.isRequired
};