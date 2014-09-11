import Ember from 'ember';
import ValidateWithRetrieveMixin from '../mixins/validate-with-retrieve';

export default Ember.Component.extend(ValidateWithRetrieveMixin, {
  fullMessage: null,

  /**
   * The observing method which is triggered when the 'errors' property of the
   * parent validation-with component changed
   */
  errorsChanged: function() {
    var errors = this.get('validateWith.errors'),
        message = errors ? errors.join(',') : null;

    this.set('fullMessage', message);
  }.observes('validateWith.errors')
});
