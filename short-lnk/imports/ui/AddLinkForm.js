import { Meteor } from 'meteor/meteor';
import React from 'react';

export default class AddLinkForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { err: undefined }
  }

  onFormSubmit(e) {
    e.preventDefault();

    let url = this.refs.url.value;
    Meteor.call('links.insert', url, (err, res) => {
      console.log('insert callback -> err:', err, ', res:', res);

      if (err) {
        this.setState( { err });
      }
      else {
        this.setState({ err: undefined });
        this.refs.url.value = '';
      }
    });
  }

  renderError() {
    if (this.state.err) {
      return <div>{this.state.err.reason}</div>;
    }
  }

  render() {
    return (
      <div>
        <p>Add Link</p>
        {this.renderError()}
        <form onSubmit={this.onFormSubmit.bind(this)}>
          <input type='text' name='url' ref='url' placeholder='URL' />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}