import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';

import Clipboard from 'clipboard';

export default class LinksListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false
    };
  }

  componentDidMount() {
    this.clipboard = new Clipboard(this.refs.copy);

    this.clipboard.on('success', (e) => {
      this.setState({copied: true});
      setTimeout(() => {
        this.setState({copied: false});
      }, 1000)
    });

    this.clipboard.on('error', (e) => {
      console.log('error', e);
      alert('Could not copy to clipboard. Please manually copy the link!');
    });
  }

  componentWillUnmount() {
    this.clipboard.destroy();
  }

  render() {
    let url = Meteor.absoluteUrl(this.props.link._id);

    return (
      <div>
        <p><a href={this.props.link.url}>{this.props.link.url}</a></p>
        <p>{url}</p>
        <button ref='copy' data-clipboard-text={url}>{ this.state.copied ? 'Copied' : 'Copy' }</button>
      </div>
    );
  }
}

LinksListItem.propTypes = {
  link: PropTypes.object.isRequired
};