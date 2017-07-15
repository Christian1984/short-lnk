import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import SimpleSchema from 'simpl-schema';

export let LinksCollection = new Mongo.Collection('links');

if (Meteor.isServer) {
  Meteor.publish('links', function() {
    let userId = this.userId;
    return LinksCollection.find({userId});
  });
}

/*if (Meteor.isClient) {
  Meteor.subscribe('links');
}*/

let linkSchema = new SimpleSchema({
  url: {
    type: String,
    regEx: SimpleSchema.RegEx.Url
  }
});

Meteor.methods({
  'links.insert'(url) {
    //check if user is authorized
    if (!this.userId) {
      throw new Meteor.Error(403, 'Cannot insert to database. User not authorized!');
    }

    //validate url
    try {
      console.log('validating...');
      linkSchema.validate({ url });
    }
    catch (e) {
      console.log('validation failed...');
      throw new Meteor.Error(400, `${url} is not a valid URL!`);
    }
    
    console.log('successfully validated...');

    //insert link into db
    LinksCollection.insert({
      userId: this.userId,
      url
    });

    return 'Link inserted successfully';
  }
});