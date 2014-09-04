import ValidateMessageComponent from './validate-message';

function getBindingFrom(context, Binding){
  var from = Binding._from,
      source = from.slice(0, from.lastIndexOf('.'));

  if (Ember.isBlank(source) ||
      !Ember.Component.prototype.isPrototypeOf(context)) {
    return null;
  }

  return context.get(source);
};

function getBindingTo(context, Binding){
  var from = Binding._from,
      target = from.slice(from.lastIndexOf('.') + 1);

  if (Ember.isBlank(target) ||
      !Ember.Component.prototype.isPrototypeOf(context)) {
    return null;
  }

  return target
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


function isValidateMessageComponent(object) {
  return ValidateMessageComponent.prototype.isPrototypeOf(object);
};

export default Ember.Component.extend({

  model: null,

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
