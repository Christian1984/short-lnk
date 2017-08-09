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
      this.setState({ showVisible: Session.get('showVisible') });
    });
    window.filterTracker = this.filterTracker;
  }

  componentWillUnmount() {
    this.filterTracker.stop();
  }

  onChange(e) {
    let showVisible = !e.target.checked;
    Session.set('showVisible', showVisible);
  }

  render() {
    return (
      <div>
        <label className='checkbox'>
          <input type='checkbox'
            className='checkbox__box'
            onChange={ this.onChange.bind(this) }
            checked={ !this.state.showVisible }        
          />
          Show Hidden Links
        </label>
      </div>
    )
  ;}
}