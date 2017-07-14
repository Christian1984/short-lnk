import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

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

Meteor.methods({
  'links.insert'(url) {
    if (!this.userId) {
      throw new Meteor.Error(403, 'Cannot insert to database. User not authorized!');
    }

    LinksCollection.insert({
      userId: this.userId,
      url
    });

    return 'Link inserted successfully';
  }
});