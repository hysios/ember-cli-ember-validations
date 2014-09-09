import Ember from 'ember';
import ValidateWithComponent from './validate-with';

export default Ember.Component.extend({
  fullMessage: null,
  validateWith: null,

  didInsertElement: function() {
    var view = this.get('parentView');

    //find until parentView is undefined
    while (view) {
      if(ValidateWithComponent.prototype.isPrototypeOf(view)) {
        this.set('validateWith', view);
        view.addObserver('errors', this, this.setMessage.bind(this));
        return;
      }
      view = view.get('parentView');
    }
  },

  setMessage: function() {
    var errors = this.get('validateWith.errors'),
        message = errors.join(',');
    this.set('fullMessage', message);
  }
});
