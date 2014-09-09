import Ember from 'ember';
import ValidateWithComponent from './validate-with';

export default Ember.Component.extend({
  fullMessage: null,
  validateWith: null,

  /**
   * find parent compnent view 'validate-with', then manually add
   * a observer method on 'errors' property.
   */
  didInsertElement: function() {
    var view = this.get('parentView');

    while (view) {
      if(ValidateWithComponent.prototype.isPrototypeOf(view)) {
        this.set('validateWith', view);
        view.addObserver('errors', this, this.errorsChanged);
        return;
      }
      view = view.get('parentView');
    }
  },

  /**
   * observer method which triggered when errors changed in the parentView.
   */
  errorsChanged: function() {
    var errors = this.get('validateWith.errors'),
        message = errors.join(',');
    this.set('fullMessage', message);
  }
});
