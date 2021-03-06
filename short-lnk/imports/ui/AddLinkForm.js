import { Meteor } from 'meteor/meteor';
import React from 'react';
import Modal from 'react-modal';

export default class AddLinkForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      url: '',
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
      //console.log('insert callback -> err:', err, ', res:', res);
      if (err) {
        this.setState( { err });
      }
      else {
        this.handleModalClose();
      }
    });
  }

  handleModalClose() {
    this.setState({ 
      isOpen: false, 
      url: '' ,
      err: undefined
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
        <button className='button' onClick={() => this.setState({ isOpen: true })}>+ Add Link</button>
        <Modal isOpen={this.state.isOpen} 
          contentLabel='Add Link'
          onAfterOpen={() => this.refs.url.focus()}
          onRequestClose={this.handleModalClose.bind(this)}
          className='boxed-view__box'
          overlayClassName='boxed-view boxed-view--modal'
        >
          <h1>Add Link</h1>
          {this.renderError()}
          <form className='boxed-view__form' onSubmit={this.onFormSubmit.bind(this)}>
            <input type='text' 
              name='url'
              ref='url'
              placeholder='URL' 
              value={this.state.url}
              onChange={this.onUrlChanged.bind(this)} />
            <button className='button'>Submit</button>
            <button className='button button--secondary' type='button' onClick={this.handleModalClose.bind(this)}>Cancel</button>
          </form>
        </Modal>
      </div>
    );
  }
}