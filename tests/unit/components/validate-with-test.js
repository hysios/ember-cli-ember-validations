import Ember from 'ember';
import { test, moduleForModel, moduleForComponent } from 'ember-qunit';

moduleForComponent('validate-with', 'ValidateWithComponent', {
  // specify the other units that are required for this test
  //
  needs: [ 'component:validate-message' ]

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


test('can input', function() {
  expect(2);

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

