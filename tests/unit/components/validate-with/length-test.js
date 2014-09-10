import { test, moduleForComponent } from 'ember-qunit';
import Ember from 'ember';
import Model from './model';

moduleForComponent('validate-with', 'ValidateWithComponent', {
  // specify the other units that are required for this test
  needs: [ 'component:validate-message' ]
});

var MyTest = Ember.lookup.MyTest = Ember.lookup.MyTest || Ember.Namespace.create();
MyTest.lengthModel = Model.create({
  myLength: '12'
});

test('it validate length', function() {
  expect(1);

  // creates the component instance
  var component = this.subject({
    template: Ember.Handlebars.compile(
      '{{input valueBinding="MyTest.lengthModel.myLength"}}' +
      '{{validate-message}}' ),
    propertyBinding: Ember.Binding.from("MyTest.lengthModel.myLength").to("property")
  });

  this.append();

  Ember.run(function() {
    MyTest.lengthModel.set('myLength', '12');
  });

  var yieldViews = component._childViews[0],
      errorMessageView = yieldViews._childViews[1];

  equal(errorMessageView.get('fullMessage'), "is not a number");
});
