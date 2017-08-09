import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

import React from 'react';
import PropTypes from 'prop-types';
import FlipMove from 'react-flip-move';

import { LinksCollection } from './../api/Links';

import LinksListItem from './LinksListItem';

export default class LinksList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      links: []
    };
  }

  componentDidMount() {
    Session.set('showVisible', true);
    this.linksTracker = Tracker.autorun(() => {
      Meteor.subscribe('links');
      let links = LinksCollection.find({
        visible: Session.get('showVisible')
      }).fetch();
      this.setState({links});
    });
  }

  componentWillUnmount() {
    this.linksTracker.stop();
  }

  renderListItems() {
    if (this.state.links.length === 0) {
      return (
        <div className='item'>
          <p className='item__status-msg'>No Links found!</p>
        </div>
      );
    }

    return this.state.links.map((link) => <LinksListItem key={link._id} link={link} />);
  }

  render() {
    return (
      <div>
        <FlipMove maintainContainerHeight={true}>
          {this.renderListItems()}
        </FlipMove>      
      </div>
    );
  }
}