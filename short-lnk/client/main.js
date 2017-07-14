import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import ReactDOM from 'react-dom';

import { onAuthChange, routes } from './../imports/routes/routes';


Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));

  Tracker.autorun(() => {
    let isAuthenticated = !!Meteor.userId();
    onAuthChange(isAuthenticated);
  });

  Meteor.call('greetUser', (err, res) => {
    console.log('Greet User Callback -> err:', err, ', res:', res);
  });

  Meteor.call('addNumbers', '5', 7, (err, res) => {
    console.log('addNumbers callback -> err:', err, ', res:', res);
  })
});