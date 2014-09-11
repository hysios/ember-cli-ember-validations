import { test, moduleForComponent } from 'ember-qunit';
import Ember from 'ember';
import TestContext from './context';

moduleForComponent('validate-with', 'ValidateWithComponent', {
  needs: [ 'component:validate-message' ]
});

test('url', function() {
  expect(2);

  // creates the component instance
  var component = this.subject({
    template: Ember.Handlebars.compile(
      '{{input valueBinding="TestContext.testModel.myUrl"}}' +
      '{{validate-message}}' ),
    propertyBinding: Ember.Binding.from("TestContext.testModel.myUrl").to("property")
  });

  this.append();

  Ember.run(function() {
    TestContext.testModel.set('myUrl', 'http://www.abc.com');
  });
  var yieldViews = component._childViews[0],
      errorMessageView = yieldViews._childViews[1],
      msg = errorMessageView.get('fullMessage');
  equal(msg, '', TestContext.testModel.get('myUrl') + ' is valid');

  Ember.run(function() {
    TestContext.testModel.set('myUrl', 'www.abc.com');
  });
  msg = errorMessageView.get('fullMessage');
  equal(msg, 'is not a valid URL', TestContext.testModel.get('myUrl') + ' is not valid');
});
