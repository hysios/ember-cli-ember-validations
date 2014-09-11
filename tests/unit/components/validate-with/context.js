import Ember from 'ember';

var TestModel = Ember.Object.extend(Ember.Validations.Mixin, {
  myLength: null,
  myUrl: null,
  myNumber: null,
  myPresence: null,
  login: null,
  password: null,
  passwordConfirmation: null,

  validations: {
    myLength: {
      length: { minimum: 5 }
    },
    myUrl: {
      url: { allowUserPass: true }
    },
    myNumber: {
      numericality: true
    },
    myPresence: {
      presence: true
    },
    login: {
      format:{
        with: /^([a-zA-Z]|\d)+$/,
        message: 'must be letters and numbers only'
      }
    },
    password: {
      confirmation: {message: 'you must confirm'}
    }
  }
});

var TestContext = Ember.lookup.TestContext = Ember.lookup.TestContext || Ember.Namespace.create();
TestContext.testModel = TestModel.create({
  myLength: null
});

export default TestContext;
