import { test, moduleForComponent } from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('validate-bootstrap', 'ValidateBootstrapComponent', {
  // specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']
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

MyTest.bootstrapModel = SampleModel.create({
  field: 'hello'
});


test('it renders', function() {
  expect(2);

  // creates the component instance
  var component = this.subject({
    layout: Ember.Handlebars.compile('{{yield}}')
  });

  equal(component.state, 'preRender');

  // appends the component to the page
  this.append();
  equal(component.state, 'inDOM');
});

test('it returns different layoutName', function() {
  var component = this.subject();

  equal(component.get('layoutName'), 'components/validate-bootstrap-default');

  Ember.run(function() {
    component.set('horizontal', true);
  });

  equal(component.get('layoutName'), 'components/validate-bootstrap-horizontal');
});


test('default validateStatus value should be empty a string', function() {
  var component = this.subject({
    canValidate: false
  });

  equal(component.get('validateStatus'), '');
});


test('validateStatus depends on the value of isvalid', function() {
  var component = this.subject({
    canValidate: true
  });

  Ember.run(function() {
    component.set('isValid', true);
  });
  equal(component.get('validateStatus'), 'has-success');

  Ember.run(function() {
    component.set('isValid', false);
  });
  equal(component.get('validateStatus'), 'has-error');
});

