import Ember from 'ember';

var IS_GLOBAL = /^([A-Z$]|([0-9][A-Z$]))/,
    get = Ember.get;

function isGlobalPath(path) {
  return IS_GLOBAL.test(path);
}

function getWithGlobals(obj, path) {
  return get(isGlobalPath(path) ? Ember.lookup : obj, path);
}

function getBindingFrom(context, Binding){
  var from = Binding._from,
      source = from.slice(0, from.lastIndexOf('.'));

  if (Ember.isBlank(source) ||
      !Ember.Component.prototype.isPrototypeOf(context)) {
    return null;
  }

  return getWithGlobals(context, source);
};

function getBindingTo(context, Binding){
  var from = Binding._from,
      target = from.slice(from.lastIndexOf('.') + 1);

  if (Ember.isBlank(target) ||
      !Ember.Component.prototype.isPrototypeOf(context)) {
    return null;
  }

  return target;
};

function validateProperty(model, property) {
  var validators;

  if (!Ember.Validations.Mixin.detect(model)) {
    return ;
  }

  validators = model.validators.filterBy('property', property);

  return Ember.RSVP.Promise.all(validators.map(function(validator){
    return validator.validate();
  }));
};

/**
 * validate-with provide a block syntax that help you do input validate
 * and show error messages automatically. it use the power of "ember-validation",
 * you should config the validate logic in your model then use like below:
 *
 *   {{#validate-with propertyBinding="user.login"}}
 *     <label>
 *       {{validate-message}}
 *     </label>
 *     {{input valueBinding="user.login"}}
 *   {{/validate-with}}
 *
 */
export default Ember.Component.extend({
  model: null,
  errors: null,
  property: null,
  isValid: null,
  firstValid: false,
  validCount: 0,
  disableIcon: false,

  propertyChanged: function() {
    var propertyBinding = this.get('propertyBinding'),
        model = this.get('model'),
        _this = this,
        property;

    if (!model) {
      model = getBindingFrom(this, propertyBinding);
    }

    property = getBindingTo(this, propertyBinding);

    if (!(model && property)) return;

    model.set(property, this.get('property'));

    validateProperty(model, property).then(function(array){
      _this.set('errors', Ember.A());
      _this.set('isValid', true);
    }, function(errors){
      _this.set('errors', errors[property]);
      _this.set('isValid', false);
    }).finally(function(){
      _this.incrementProperty('validCount');
    });
  }.observes('property'),

  canValidate: function() {
    var firstValid = this.get('firstValid');

    if (firstValid) {
      return true;
    }

    return this.get('validCount') > 0;

  }.property('firstValid', 'validCount')
});
