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

let updateVisibilitySchema = new SimpleSchema({
  _id: {
    type: String,
    min: 1
  },
  isVisible: {
    type: Boolean
  }
});

let trackLinkSchema = new SimpleSchema({
  _id: {
    type: String,
    min: 1
  }
});

Meteor.methods({
  'links.insert'(url) {
    //check if user is authorized
    if (!this.userId) {
      throw new Meteor.Error(403, 'Cannot write to database. User not authorized!');
    }

    console.log('validating...');
    linkSchema.validate({ url });    
    console.log('successfully validated...');

    //insert link into db
    LinksCollection.insert({
      _id: shortid.generate(),
      userId: this.userId,
      url,
      visible: true,
      visitedCount: 0,
      lastVisitedAt: undefined
    });

    return 'Link inserted successfully';
  },
  'links.setVisibility'(_id, isVisible) {
    //check if user is authorized
    if (!this.userId) {
      throw new Meteor.Error(403, 'Cannot write to database. User not authorized!');
    }

    updateVisibilitySchema.validate({ _id, isVisible });

    //insert link into db
    LinksCollection.update({ _id, userId: Meteor.userId }, { $set: { visible: isVisible } });

    return 'Link visibility updated successfully';
  },
  'links.trackVisit'(_id) {
    console.log('links.trackVisit called');
    trackLinkSchema.validate({ _id });
    LinksCollection.update(
      { 
        _id 
      }, 
      { 
        $inc: { 
          visitedCount: 1 
        }, 
        $set: { 
          lastVisitedAt: new Date().getTime()
        } 
      }
    );  
  }
});