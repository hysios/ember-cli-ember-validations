import Ember from 'ember';
import ValidateWithComponent from './validate-with';

export default ValidateWithComponent.extend({
  classNames: ['form-group', 'has-feedback'],
  classNameBindings: ['validateStatus'],
  horizontal: false,

  layoutName: function() {
    if(this.get('horizontal')) {
      return 'components/validate-bootstrap-horizontal';
    } else {
      return 'components/validate-bootstrap-default';
    }
  }.property('horizontal'),

  validateStatus: function(){
    var canValidate = this.get('canValidate'),
        isValid = this.get('isValid');
    if (!canValidate)
      return "";

    return isValid ? "has-success" : "has-error";
  }.property('isValid', 'firstValid')
});
