import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import React from 'react';
import ReactDOM from 'react-dom';

import Signup from './../imports/ui/signup';
import Link from './../imports/ui/link';

Meteor.startup(() => {
  ReactDOM.render(<div><Signup /><Link /></div>, document.getElementById('app'));
});