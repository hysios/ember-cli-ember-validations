import Ember from 'ember';
import { test, moduleForModel, moduleForComponent } from 'ember-qunit';

moduleForComponent('validate-with', 'ValidateWithComponent', {
  // specify the other units that are required for this test
  //
  needs: [ 'component:validate-message', 'component:validate-icon' ]

});

var SampleModel = Ember.Object.extend(Ember.Validations.Mixin, {
  field: null,
  age: null,

  validations: {
    field: {
      presence: true
    },
    age: {
      numericality: true
    }
  }
});

var MyTest = Ember.lookup.MyTest = Ember.Namespace.create();

MyTest.sampleModel = SampleModel.create({
  field: 'hello'
});

test('it renders', function() {
  expect(2);

  // creates the component instance
  var component = this.subject();
  equal(component._state, 'preRender');

  // appends the component to the page
  this.append();
  equal(component._state, 'inDOM');
});


test('it input', function() {

  var component = this.subject({
    template: Ember.Handlebars.compile('{{input valueBinding="MyTest.sampleModel.field"}}'),
    propertyBinding: Ember.Binding.from("MyTest.sampleModel.field").to("property")
  });

  var $component = this.append();

  Ember.run(function() {
    MyTest.sampleModel.set('field', 'world');
  });

  equal($component.find('input').length, 1);
  equal($component.find('input').val(), 'world');
});

test('it input clear value', function() {

  var component = this.subject({
    template: Ember.Handlebars.compile(
      '{{input valueBinding="MyTest.sampleModel.field"}}' +
      '{{validate-message}}' ),
    propertyBinding: Ember.Binding.from("MyTest.sampleModel.field").to("property")
  });

  var $component = this.append();

  Ember.run(function() {
    MyTest.sampleModel.set('field', '');
  });


  var yieldViews = component._childViews[0],
      errorMessageView = yieldViews._childViews[1];

  equal(errorMessageView.get('fullMessage'), "can't be blank");

});

test('numericality rule', function() {

  var component = this.subject({
    template: Ember.Handlebars.compile(
      '{{input valueBinding="MyTest.sampleModel.age"}}' +
      '{{validate-message}}' ),
    propertyBinding: Ember.Binding.from("MyTest.sampleModel.age").to("property")
  });

  var $component = this.append();

  Ember.run(function() {
    MyTest.sampleModel.set('age', 'abc');
  });

  var yieldViews = component._childViews[0],
      errorMessageView = yieldViews._childViews[1];

  equal(errorMessageView.get('fullMessage'), "is not a number");

  Ember.run(function() {
    MyTest.sampleModel.set('age', '-123.00');
  });

  // yieldViews = component._childViews[0],
  //     errorMessageView = yieldViews._childViews[1];

  equal(errorMessageView.get('fullMessage'), "");
});

test('validate icon1', function(){
  var component = this.subject({
    template: Ember.Handlebars.compile(
      '{{input valueBinding="MyTest.sampleModel.field"}}' +
      '{{validate-icon}}'),
    propertyBinding: Ember.Binding.from("MyTest.sampleModel.field").to("property")
  });

  var $component = this.append();

  Ember.run(function() {
    MyTest.sampleModel.set('field', '123');
  });

  var yieldViews = component._childViews[0],
      validateIconView = yieldViews._childViews[1];

  equal(validateIconView.get('iconClass'), 'glyphicon-ok');
});

test('validate icon2', function(){
  var component = this.subject({
    template: Ember.Handlebars.compile(
      '{{input valueBinding="MyTest.sampleModel.field"}}' +
      '{{validate-icon}}'),
    propertyBinding: Ember.Binding.from("MyTest.sampleModel.field").to("property")
  });

  var $component = this.append();

  Ember.run(function() {
    MyTest.sampleModel.set('field', '');
  });

  var yieldViews = component._childViews[0],
      validateIconView = yieldViews._childViews[1];

  equal(validateIconView.get('iconClass'), 'glyphicon-remove');
});

test('validate icon3', function(){
  var component = this.subject({
    template: Ember.Handlebars.compile(
      '{{input valueBinding="MyTest.sampleModel.field"}}' +
      '{{validate-icon}}'),
    propertyBinding: Ember.Binding.from("MyTest.sampleModel.field").to("property"),
    firstValid: false
  });

  var $component = this.append();

  Ember.run(function() {
    MyTest.sampleModel.set('field', '');
  });

  var yieldViews = component._childViews[0],
      validateIconView = yieldViews._childViews[1];

  equal(validateIconView.get('isVisible'), false);
});

test('validate icon4', function(){
  var component = this.subject({
    template: Ember.Handlebars.compile(
      '{{input valueBinding="MyTest.sampleModel.field"}}' +
      '{{validate-icon}}'),
    propertyBinding: Ember.Binding.from("MyTest.sampleModel.field").to("property"),
    firstValid: false
  });

  var $component = this.append();

  Ember.run(function() {
    MyTest.sampleModel.set('field', '');
    MyTest.sampleModel.set('field', '123');
  });


  var yieldViews = component._childViews[0],
      validateIconView = yieldViews._childViews[1];

  equal(validateIconView.get('isVisible'), true);
});
