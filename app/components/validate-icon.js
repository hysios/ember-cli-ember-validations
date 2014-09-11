import Ember from 'ember';
import ValidateWithRetrieveMixin from '../mixins/validate-with-retrieve';

export default Ember.Component.extend(ValidateWithRetrieveMixin, {
  isValid: Ember.computed.alias('validateWith.isValid'),
  canValidate: Ember.computed.alias('validateWith.canValidate'),
  classNames: ['glyphicon', 'form-control-feedback'],
  classNameBindings: ['iconClass'],
  showIcon: true,

  /**
   * @property {string} isValid add different class according to
   * isValid property
   */
  iconClass: function(){
    return this.get('isValid') ? 'glyphicon-ok' : 'glyphicon-remove';
  }.property('isValid'),

  /**
   * @property {boolean} canValidate determine whether to show the icon
   */
  isVisible: function(){
    return this.get('showIcon') ? this.get('canValidate') : false;
  }.property('canValidate')
});
