import SimpleSchema from 'simpl-schema';

export function schemaExample1() {
  let petSchema = new SimpleSchema({
    name: {
      type: String,
      min: 1,
      max: 100,
    },
    age: {
      type: Number,
      min: 0,
    },
    contactNumber: {
      type: String,
      optional: true,
      regEx: SimpleSchema.RegEx.Phone,
    }
  });

  //petSchema.validate({name: 'charlie'});
  //petSchema.validate({name: 21}); //Name must be of type string
  petSchema.validate({name: 'charlie', age: 16, contactNumber: '0049-151-61025732'});
}

export function schemaExample2() {
  let employeeSchema = new SimpleSchema({
    name: {
      type: String,
    },
    hourlyWage: {
      type: Number,
      min: 0,
      exclusiveMin: true,
    },
    email: {
      type: String,
      regEx: SimpleSchema.RegEx.Email,
    }
  });

  employeeSchema.validate({name: 'chris', hourlyWage: 15, email: 'mail@example.com'});
}