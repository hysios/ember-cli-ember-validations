import { test, moduleForComponent } from 'ember-qunit';
import Ember from 'ember';
import TestContext from './context';

moduleForComponent('validate-with', 'ValidateWithComponent', {
  needs: [ 'component:validate-message' ]
});

test('length', function() {
  expect(2);

  // creates the component instance
  var component = this.subject({
    template: Ember.Handlebars.compile(
      '{{input valueBinding="TestContext.testModel.myLength"}}' +
      '{{validate-message}}' ),
    propertyBinding: Ember.Binding.from("TestContext.testModel.myLength").to("property")
  });

  this.append();

  Ember.run(function() {
    TestContext.testModel.set('myLength', '12');
  });
  var yieldViews = component._childViews[0],
      errorMessageView = yieldViews._childViews[1],
      msg = errorMessageView.get('fullMessage');
  ok(msg.indexOf('is too short')>-1, 'length too short');

  Ember.run(function() {
    TestContext.testModel.set('myLength', '12345');
  });
  msg = errorMessageView.get('fullMessage');
  equal(msg, '', 'length long enough');
});
