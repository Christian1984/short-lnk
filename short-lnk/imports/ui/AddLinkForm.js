import { Meteor } from 'meteor/meteor';
import React from 'react';

export default class AddLinkForm extends React.Component {
  onFormSubmit(e) {
    e.preventDefault();

    let url = this.refs.url.value;
    Meteor.call('links.insert', url, (err, res) => {
      console.log('insert callback -> err:', err, ', res:', res);

      if (!err) {
        this.refs.url.value = '';
      }
    });
  }

  render() {
    return (
      <div>
        <p>Add Link</p>
        <form onSubmit={this.onFormSubmit.bind(this)}>
          <input type='text' name='url' ref='url' placeholder='URL' />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}