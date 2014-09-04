import Ember from 'ember';

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
