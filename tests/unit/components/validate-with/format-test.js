import { test, moduleForComponent } from 'ember-qunit';
import Ember from 'ember';
import TestContext from './context';

moduleForComponent('validate-with', 'ValidateWithComponent', {
  needs: [ 'component:validate-message' ]
});

test('format rule', function() {

  var component = this.subject({
    template: Ember.Handlebars.compile(
    '{{input valueBinding="TestContext.testModel.login"}}' +
    '{{validate-message}}' ),
    propertyBinding: Ember.Binding.from("TestContext.testModel.login").to("property")
  });

  var $component = this.append();

  Ember.run(function() {

    TestContext.testModel.set('login', '%guying');
  });

  var yieldViews = component._childViews[0],
     errorMessageView = yieldViews._childViews[1];

  equal(errorMessageView.get('fullMessage'), "must be letters and numbers only");

  Ember.run(function() {
    TestContext.testModel.set('login', 'guying');
  });

  equal(errorMessageView.get('fullMessage'), "");
});
