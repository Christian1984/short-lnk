import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import './../imports/startup/simple-schema-configuration';

import ReactDOM from 'react-dom';

import { onAuthChange, routes } from './../imports/routes/routes';


Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));

  Tracker.autorun(() => {
    let isAuthenticated = !!Meteor.userId();
    onAuthChange(isAuthenticated);
  });
});