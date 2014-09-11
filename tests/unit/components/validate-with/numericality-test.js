import { test, moduleForComponent } from 'ember-qunit';
import Ember from 'ember';
import TestContext from './context';

moduleForComponent('validate-with', 'ValidateWithComponent', {
  needs: [ 'component:validate-message' ]
});

test('numericality', function() {
  expect(2);

  // creates the component instance
  var component = this.subject({
    template: Ember.Handlebars.compile(
      '{{input valueBinding="TestContext.testModel.myNumber"}}' +
      '{{validate-message}}' ),
    propertyBinding: Ember.Binding.from("TestContext.testModel.myNumber").to("property")
  });

  this.append();

  Ember.run(function() {
    TestContext.testModel.set('myNumber', 'abc');
  });
  var yieldViews = component._childViews[0],
      errorMessageView = yieldViews._childViews[1],
      msg = errorMessageView.get('fullMessage');
  equal(msg, 'is not a number', TestContext.testModel.get('myNumber') + ' is not valid');

  Ember.run(function() {
    TestContext.testModel.set('myNumber', 12345);
  });
  msg = errorMessageView.get('fullMessage');
  equal(msg, '', TestContext.testModel.get('myNumber') + ' is valid');
});
