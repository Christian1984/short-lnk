import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';

import Clipboard from 'clipboard';
import moment from 'moment';

import { LinksCollection } from './../api/Links';

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
      this.setState({ copied: true });
      setTimeout(() => {
        this.setState({ copied: false });
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

  onHideClicked() {
    Meteor.call(
      'links.setVisibility', 
      this.props.link._id, !this.props.link.visible, 
      (err, res) => {
        console.log('insert callback -> err:', err, ', res:', res);
      }
    );
  }

  renderStats() {
    let visitedCount = this.props.link.visitedCount;
    let visitedSuffix = visitedCount === 1 ? 'visit' : 'visits';

    let lastVisitedAt = this.props.link.lastVisitedAt;
    let visitedAtMsg = lastVisitedAt ? `(visited ${moment(lastVisitedAt).fromNow()})` : undefined;
    return (
      <p>{visitedCount} {visitedSuffix} {visitedAtMsg}</p>
    );
  }

  render() {
    let url = Meteor.absoluteUrl(this.props.link._id);

    return (
      <div>
        <p><a href={ this.props.link.url }>{ this.props.link.url }</a></p>
        <p>{url}</p>
        {this.renderStats()}
        <a href={url} target='_blank'>Visit</a>
        <button ref='copy' data-clipboard-text={url}>{ this.state.copied ? 'Copied' : 'Copy' }</button>
        <button ref='hide' onClick={ this.onHideClicked.bind(this) }>{ this.props.link.visible ? 'Hide' : 'Unhide'}</button>
      </div>
    );
  }
}

LinksListItem.propTypes = {
  link: PropTypes.object.isRequired
};