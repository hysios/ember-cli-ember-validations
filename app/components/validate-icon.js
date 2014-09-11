import Ember from 'ember';
import ValidateWithRetrieveMixin from '../mixins/validate-with-retrieve';

export default Ember.Component.extend(ValidateWithRetrieveMixin, {
  isValid: Ember.computed.alias('validateWith.isValid'),
  canValidate: Ember.computed.alias('validateWith.canValidate'),
  disableIcon: Ember.computed.alias('validateWith.disableIcon'),
  classNames: ['glyphicon', 'form-control-feedback'],
  classNameBindings: ['iconClass'],

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
    return !this.get('disableIcon') && this.get('canValidate');
  }.property('canValidate', 'disableIcon')
});
