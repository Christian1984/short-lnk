import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

import React from 'react';
import PropTypes from 'prop-types';

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
    Session.set('showVisibleLinks', true);
    this.linksTracker = Tracker.autorun(() => {
      Meteor.subscribe('links');
      let links = LinksCollection.find({
        visible: Session.get('showVisibleLinks')
      }).fetch();
      this.setState({links});
    });
  }

  componentWillUnmount() {
    this.linksTracker.stop();
  }

  renderListItems() {
    return this.state.links.map((link) => <LinksListItem key={link._id} link={link} />);
  }

  render() {
    console.log('render:', this.state.links);

    return (
      <div>
        <label>
          <input type='checkbox' 
            ref='visibilityCheckbox' 
            onClick={() => {
              Session.set('showVisibleLinks', !this.refs.visibilityCheckbox.checked);
            }
          } />
          Show Hidden Links
        </label>
        {this.renderListItems()}
      </div>);
  }
}