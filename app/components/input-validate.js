import Ember from 'ember';
import ValidateWithComponent from './validate-with';

export default ValidateWithComponent.extend({
  fullMessage: function() {
    var errors = this.get('errors');
    if(errors) {
      return errors.join(',');
    } else {
      return '';
    }
  }.property('errors')
});
