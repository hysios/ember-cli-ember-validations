import Ember from 'ember';
import ValidateWithComponent from './validate-with';

export default ValidateWithComponent.extend({
  horizontal: false,
  layoutName: 'components/t-test',

  init: function() {
    this._super();
  }
  // horizontalLayout: function() {
  //   if (this.get('horizontal')) {
  //     this.set('layoutName', 'validate-bootstrap');
  //     this.set('templateName', 'validate-bootstrap-horizontal');
  //   }
  // }.property('horizontal')
});
