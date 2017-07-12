import { Meteor } from 'meteor/meteor';
import { schemaExample1, schemaExample2 } from './../imports/examples/Schema';

Meteor.startup(() => {
  // code to run on server at startup
  //schemaExample1();
  schemaExample2();
});
