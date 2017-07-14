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
  greetUser(name = 'User') {
    console.log('greetUser method running!');
    return `Hello ${name}!`;
  }
});