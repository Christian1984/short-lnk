import { Meteor } from 'meteor/meteor';
import { LinksCollection } from './../imports/api/Links';
import { WebApp } from 'meteor/webapp';

import './../imports/api/users';
import './../imports/startup/simple-schema-configuration';

Meteor.startup(() => {
  WebApp.connectHandlers.use((req, res, next) => {
    let urlId = req.url.substring(1, req.url.length);
    let urls = LinksCollection.find({_id: urlId}).fetch();

    if (urls.length == 1) {
      let url = urls[0].url;

      res.statusCode = 302;
      res.setHeader('location', url);
    }

    /*
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
    */

    next();
  });
});
