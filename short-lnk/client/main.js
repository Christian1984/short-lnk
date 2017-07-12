import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, browserHistory } from 'react-router';

import Signup from './../imports/ui/Signup';
import Link from './../imports/ui/Link';
import NotFound from './../imports/ui/NotFound';
import Login from './../imports/ui/Login';

//window.browserHistory = browserHistory;

let unauthenticatedPages = ['/', '/signup'];
let authenticatedPages = ['/links'];
let authedTargetRoute = '/links';
let unAuthedTargetRoute = '/';

function onEnterPublicPage() {
  if (Meteor.userId()) {
    browserHistory.replace(authedTargetRoute);
  }
}

function onEnterPrivatePage() {
  if (!Meteor.userId()) {
    browserHistory.replace(unAuthedTargetRoute);
  }
}

let routes = (
  <Router history={browserHistory}>
    <Route path='/' component={Login} onEnter={onEnterPublicPage} />
    <Route path='/signup' component={Signup} onEnter={onEnterPublicPage} />
    <Route path='/links' component={Link} onEnter={onEnterPrivatePage} />
    <Route path='*' component={NotFound} />
  </Router>
);

Meteor.startup(() => {
  ReactDOM.render(<div><h1>Short Lnk</h1><div>{routes}</div></div>, document.getElementById('app'));

  Tracker.autorun(() => {
    let isAuthenticated = !!Meteor.userId();
    let pathname = browserHistory.getCurrentLocation().pathname;
    let isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
    let isAuthenticatedPage = authenticatedPages.includes(pathname);

    console.log('isAuthenticated:', isAuthenticated);

    if (!isAuthenticated && isAuthenticatedPage) {
      //redirect to /
      browserHistory.push('/');
    } else if (isAuthenticated && isUnauthenticatedPage) {
      //redirect to /links
      browserHistory.push('/links');
    }
  });
});