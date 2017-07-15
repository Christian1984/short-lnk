import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import shortid from 'shortid';

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
    regEx: SimpleSchema.RegEx.Url,
    label: 'Your link'
  }
});

Meteor.methods({
  'links.insert'(url) {
    //check if user is authorized
    if (!this.userId) {
      throw new Meteor.Error(403, 'Cannot insert to database. User not authorized!');
    }

    console.log('validating...');
    linkSchema.validate({ url });    
    console.log('successfully validated...');

    //insert link into db
    LinksCollection.insert({
      _id: shortid.generate(),
      userId: this.userId,
      url
    });

    return 'Link inserted successfully';
  }
});