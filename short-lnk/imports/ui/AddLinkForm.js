import { Meteor } from 'meteor/meteor';
import React from 'react';

export default class AddLinkForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: 'Chris was here',
      err: undefined 
    }
  }

  onUrlChanged(e) {
    this.setState({ url: e.target.value.trim() });
  }

  onFormSubmit(e) {
    e.preventDefault();

    let url = this.state.url;
    Meteor.call('links.insert', url, (err, res) => {
      console.log('insert callback -> err:', err, ', res:', res);

      if (err) {
        this.setState( { err });
      }
      else {
        this.setState({ err: undefined });
        this.setState({ url: '' });
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
          <input type='text' 
            name='url'
            placeholder='URL' 
            value={this.state.url}
            onChange={this.onUrlChanged.bind(this)} />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}