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
  greetUser(name) {
    console.log('greetUser method running!');

    if (!name) {
      throw new Meteor.Error(400, 'No username provided');
    }

    return `Hello ${name}!`;
  },
  addNumbers(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Meteor.Error(400, 'Arguments must be numbers'); 
    }
    return a + b;
  }
});