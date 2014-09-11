import Ember from 'ember';
import ValidateWithComponent from './validate-with';

export default Ember.Component.extend({
  fullMessage: null,
  validateWith: null,
  isValide: null,
  classNameBindings: ['priority'],
  priority: function() {
    return 'has-error';
  }.property('status'),

  /**
   * find parent compnent view 'validate-with', then manually add
   * a observer method on 'errors' property.
   */
  didInsertElement: function() {
    var view = this.nearestOfType(ValidateWithComponent);
    if(view) {
      this.set('validateWith', view);
      view.addObserver('errors', this, this.errorsChanged);
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
