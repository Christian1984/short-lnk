import { Meteor } from 'meteor/meteor';
import './../imports/api/users';
import { LinksCollection } from './../imports/api/Links';



Meteor.startup(() => {
  Meteor.call('greetUser', (err, res) => {
    console.log('Greet User Callback -> err:', err, ', res:', res);
  });
});
