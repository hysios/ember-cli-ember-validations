import Ember from 'ember';
import { test, moduleForModel, moduleForComponent } from 'ember-qunit';

moduleForComponent('validate-with', 'ValidateWithComponent', {

  // specify the other units that are required for this test
      needs: [ 'component:validate-message' ]

});

var SampleModel = Ember.Object.extend(Ember.Validations.Mixin, {

  login: null,
  age: null,

  validations: {
    login: {
      presence: true,
      format: { with: /^([a-zA-Z]|\d)+$/, message: 'must be letters and numbers only' },
      confirmation: true
    },
    age: {
      numericality: true
    }
  }
});

var MyTest = Ember.lookup.MyTest = Ember.Namespace.create();

MyTest.sampleModel = SampleModel.create({
  login: 'guying'
});

test('format rule', function() {

  var component = this.subject({
    template: Ember.Handlebars.compile(
    '{{input valueBinding="MyTest.sampleModel.login"}}' +
    '{{validate-message}}' ),
    propertyBinding: Ember.Binding.from("MyTest.sampleModel.login").to("property")
  });

  var $component = this.append();

  Ember.run(function() {

    MyTest.sampleModel.set('login', '%guying');
  });

  var yieldViews = component._childViews[0],
     errorMessageView = yieldViews._childViews[1];

 equal(errorMessageView.get('fullMessage'), "must be letters and numbers only");
  
 Ember.run(function() {
    MyTest.sampleModel.set('login', 'guying');
 });

 equal(errorMessageView.get('fullMessage'), "");
});



 // test('confirmation rule', function() {
  
 //   var component = this.subject({
 //    template: Ember.Handlebars.compile(
 //      '{{input valueBinding="MyTest.sampleModel.login"}}' +

 //      '{{validate-message}}' ),
 //       ),
 //    propertyBinding: Ember.Binding.from("MyTest.sampleModel.login").to("property")
 //  });

 //  var $component = this.append();

 //  Ember.run(function() {
 //    MyTest.sampleModel.set('login', '%guying');
 //  });

 //  var yieldViews = component._childViews[0],
 //     errorMessageView = yieldViews._childViews[1];
  

 //  equal(errorMessageView.get('fullMessage'), "must be letters and numbers only");
  
 //  Ember.run(function() {

 //    MyTest.sampleModel.set('login', 'guying');

 //  });

 // equal(errorMessageView.get('fullMessage'), "");
 //  });
// });