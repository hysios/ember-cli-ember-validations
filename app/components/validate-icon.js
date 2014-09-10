import Ember from 'ember';

export default Ember.Component.extend({
  isValid: Ember.computed.alias('parentView.isValid'),
  canValidate: Ember.computed.alias('parentView.canValidate'),
  classNames: ['glyphicon', 'form-control-feedback'],
  classNameBindings: ['iconClass'],
  showIcon: true,

  iconClass: function(){
    return this.get('isValid') ? 'glyphicon-ok' : 'glyphicon-remove';
  }.property('isValid'),

  isVisible: function(){
    return this.get('showIcon') ? this.get('canValidate') : false;
  }.property('canValidate')
});
