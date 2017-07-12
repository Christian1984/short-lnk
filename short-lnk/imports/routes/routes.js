import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Signup from './../ui/Signup';
import Link from './../ui/Link';
import NotFound from './../ui/NotFound';
import Login from './../ui/Login';

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

export let routes = (
  <Router history={browserHistory}>
    <Route path='/' component={Login} onEnter={onEnterPublicPage} />
    <Route path='/signup' component={Signup} onEnter={onEnterPublicPage} />
    <Route path='/links' component={Link} onEnter={onEnterPrivatePage} />
    <Route path='*' component={NotFound} />
  </Router>
);

export let onAuthChange = (isAuthenticated) => {
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
};