import ValidateMessageComponent from './validate-message';

/**
 * getBindingForm
 * 
 * According to Binding object, obtain a property of object of itself object;
 * 
 * @param  {Object} context 	Any object from
 * @param  {Ember.Binding} Binding 		A Binding object
 * @return {Object} 			This object context
 */
function getBindingFrom(context, Binding){
  var from = Binding._from,
      source = from.slice(0, from.lastIndexOf('.'));

  if (Ember.isBlank(source) ||
      !Ember.Component.prototype.isPrototypeOf(context)) {
    return null;
  }

  return context.get(source);
};

/**
 * getBindingTo
 *
 * According to Binding object, obtain a property of object of property's name;
 * 
 * @param  {Object} context 	Any object from
 * @param  {Ember.Binding} Binding 		A Binding object
 * @return {String}         	A string property's name of object
 */
function getBindingTo(context, Binding){
  var from = Binding._from,
      target = from.slice(from.lastIndexOf('.') + 1);

  if (Ember.isBlank(target) ||
      !Ember.Component.prototype.isPrototypeOf(context)) {
    return null;
  }

  return target
};

/**
 * validateProperty
 *
 * @param  {DS.Model} model  	Used validating object instance of DS.Model or Ember.ObjectController
 * @param  {String} property 	A string name of model's property
 * @return {RSVP.Primise}       return all validator's promise object;
 */
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
 * isValidateMessageComponent
 * 
 * @param  {[any]}  object 	any object
 * @return {Boolean}        true show `object` is kind of ValidateMessageComponent object， or else
 */
function isValidateMessageComponent(object) {
  return ValidateMessageComponent.prototype.isPrototypeOf(object);
};

export default Ember.Component.extend({
  model: null,

  /**
   * propertyChanging
   * 
   * Validate property's rule when property changing
   */
  propertyChanging: function(){
    var propertyBinding = this.get('propertyBinding'),
        model = this.get('model'),
        _this = this,
        property;

    if (!model) {
      model = getBindingFrom(this, propertyBinding);
    }

    property = getBindingTo(this, propertyBinding);

    if (!(model && property)) return;

    validateProperty(model, property).then(function(array){
      _this.set('isValid', true);
      _this.set('errors', Ember.A());
      _this.notifyErrorMessage('hiddenError');
    }, function(errors){
      _this.set('isValid', false);
      _this.set('errors', errors[property]);
      _this.notifyErrorMessage('displayError', errors[property]);
    });
  }.observes('property'),

  /**
   * notifyErrorMessage
   *
   * Send message to `validate-message` component
   * 
   * @param  {String} action 		A name of Action
   * @optional  {[type]} errors 	Optional arguments with action call
   */
  notifyErrorMessage: function(action, errors){
    var yieldViews = this._childViews[0],
        errorMessageView;

    errorMessageView = yieldViews._childViews.find(function(view){
      return isValidateMessageComponent(view);
    });

    if (!Ember.isBlank(errorMessageView)) {
      errorMessageView.send(action, errors);
    }
  }
});
