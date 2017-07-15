import { Meteor } from 'meteor/meteor';
import { LinksCollection } from './../imports/api/Links';
import { WebApp } from 'meteor/webapp';

import './../imports/api/users';
import './../imports/startup/simple-schema-configuration';

Meteor.startup(() => {
  WebApp.connectHandlers.use((req, res, next) => {
    console.log('This is from my custom middleware!');
    console.log(req.url, req.method, req.headers, req.query);
    
    //set http status code
    res.statusCode = 404;

    //set http headers
    res.setHeader('my-custom-header', 'chris was here :-)');

    //set http body
    res.write('<h1>This is MY house!!!</h1>');

    //end http request
    res.end();

    next();
  });
});
