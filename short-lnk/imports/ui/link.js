import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';

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

    let url = this.refs.url.value;
    Meteor.call('links.insert', url, (err, res) => {
      this.refs.url.value = '';
      console.log('insert callback -> err:', err, ', res:', res);
    });
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