import Ember from 'ember';
import ValidateWithComponent from './validate-with';

export default ValidateWithComponent.extend({
  horizontal: false,

  layoutName: function() {
    if(this.get('horizontal')) {
      return 'components/validate-bootstrap-horizontal';
    } else {
      return 'components/validate-bootstrap-default';
    }
  }.property('horizontal')
});
