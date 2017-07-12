import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import SimpleSchema from 'simpl-schema';

let accountSchema = new SimpleSchema({
  email: SimpleSchema.RegEx.Email
});

Accounts.validateNewUser((user) => {
  let email = user.emails[0].address;

  try {
    accountSchema.validate({ email });
  }
  catch(e) {
    //console.log(e);
    //console.log(e.details[0].message);
    throw new Meteor.Error(400, e.message);
  }

  return true;
});