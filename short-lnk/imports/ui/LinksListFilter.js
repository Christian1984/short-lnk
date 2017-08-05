import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import React from 'react';

export default class LinksListFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showVisible: Session.get('showVisible') };
  }

  componentDidMount() {
    this.filterTracker = Tracker.autorun(() => {
      let showVisible = Session.get('showVisible');
      this.setState({ showVisible });
    });
  }

  componentWillUnmount() {
    this.filterTracker.stop();
  }

  onChange(e) {
    Session.set('showVisible', !e.target.checked);
  }

  render() {
    return (
      <div>
        <label>
          <input type='checkbox'
            onChange={ this.onChange.bind(this) }
            checked={ !this.state.showVisible }        
          />
          Show Hidden Links
        </label>
      </div>
    )
  ;}
}