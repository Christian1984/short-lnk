import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export let LinksCollection = new Mongo.Collection('links');

if (Meteor.isServer) {
  Meteor.publish('links', () => {
    return LinksCollection.find();
  });
}

/*if (Meteor.isClient) {
  Meteor.subscribe('links');
}*/