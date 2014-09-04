import ValidateWithComponent from './validate-with';

function isValidateWithComponent(object) {
  return ValidateWithComponent.prototype.isPrototypeOf(object);
}

export default Ember.Component.extend({
  fullMessage: null,

  actions: {
    displayError: function(errors){
      this.set('hasError', true);
      this.set('fullMessage', errors.join(','));
    },

    hiddenError: function(){
      this.set('hasError', false);
      this.set('fullMessage', null);
    }
  }
});
