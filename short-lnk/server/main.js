import { Meteor } from 'meteor/meteor';
import { LinksCollection } from './../imports/api/Links';
import { WebApp } from 'meteor/webapp';

import './../imports/api/users';
import './../imports/startup/simple-schema-configuration';

Meteor.startup(() => {
  WebApp.connectHandlers.use((req, res, next) => {
    let urlId = req.url.slice(1);
    let link = LinksCollection.findOne({_id: urlId});

    if (link) {
      res.statusCode = 302;
      res.setHeader('location', link.url);
      res.end();
    }

    next();
  });
});
