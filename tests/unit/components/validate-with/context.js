import Ember from 'ember';

var TestModel = Ember.Object.extend(Ember.Validations.Mixin, {
  myLength: null,
  myUrl: null,
  myNumber: null,
  myPresence: null,

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
    }
  }
});

var TestContext = Ember.lookup.TestContext = Ember.lookup.TestContext || Ember.Namespace.create();
TestContext.testModel = TestModel.create({
  myLength: null
});

export default TestContext;
