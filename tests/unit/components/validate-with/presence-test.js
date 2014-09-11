import { test, moduleForComponent } from 'ember-qunit';
import Ember from 'ember';
import TestContext from './context';

moduleForComponent('validate-with', 'ValidateWithComponent', {
  needs: [ 'component:validate-message' ]
});

test('presence', function() {
  expect(2);

  // creates the component instance
  var component = this.subject({
    template: Ember.Handlebars.compile(
      '{{input valueBinding="TestContext.testModel.myPresence"}}' +
      '{{validate-message}}' ),
    propertyBinding: Ember.Binding.from("TestContext.testModel.myPresence").to("property")
  });

  this.append();

  Ember.run(function() {
    TestContext.testModel.set('myPresence', 'hasValue');
  });
  var yieldViews = component._childViews[0],
      errorMessageView = yieldViews._childViews[1],
      msg = errorMessageView.get('fullMessage');
  equal(msg, '', TestContext.testModel.get('myPresence') + ' is valid');

  Ember.run(function() {
    TestContext.testModel.set('myPresence', '');
  });
  msg = errorMessageView.get('fullMessage');
  equal(msg, "can't be blank", TestContext.testModel.get('myPresence') + ' is not valid');
});
