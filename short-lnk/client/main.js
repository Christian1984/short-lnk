import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, browserHistory } from 'react-router';

import Signup from './../imports/ui/Signup';
import Link from './../imports/ui/Link';
import NotFound from './../imports/ui/NotFound';
import Login from './../imports/ui/Login';

let routes = (
  <Router history={browserHistory}>
    <Route path='/' component={Login} />
    <Route path='/signup' component={Signup} />
    <Route path='/link' component={Link} />
    <Route path='*' component={NotFound} />
  </Router>
);

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));
});