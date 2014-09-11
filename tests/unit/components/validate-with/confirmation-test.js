import { test, moduleForComponent } from 'ember-qunit';
import Ember from 'ember';
import TestContext from './context';

moduleForComponent('validate-with', 'ValidateWithComponent', {
  needs: [ 'component:validate-message' ]
});

test('confirmation rule', function() {

  var component = this.subject({
    template: Ember.Handlebars.compile(
    '{{input valueBinding="TestContext.testModel.password"}}' +
    '{{validate-message}}' ),
    propertyBinding: Ember.Binding.from("TestContext.testModel.password").to("property")
  });

  var $component = this.append();

  Ember.run(function() {

    TestContext.testModel.set('password', '123');
    TestContext.testModel.set('passwordConfirm', '456');
  });

  var yieldViews = component._childViews[0],
     errorMessageView = yieldViews._childViews[1];

 equal(errorMessageView.get('fullMessage'), "you must confirm");

 Ember.run(function() {
    TestContext.testModel.set('password', '123');
    TestContext.testModel.set('passwordConfirm', '123');
 });

 equal(errorMessageView.get('fullMessage'), "");
});
