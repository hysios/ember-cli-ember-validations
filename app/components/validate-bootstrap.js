import Ember from 'ember';
import ValidateWithComponent from './validate-with';

export default ValidateWithComponent.extend({
  classNames: ['form-group', 'has-feedback'],
  classNameBindings: ['validateStatus'],
  horizontal: false,
  defaultLabelCol: 2,
  defaultInputCol: 10,

  layoutName: function() {
    if(this.get('horizontal')) {
      return 'components/validate-bootstrap-horizontal';
    } else {
      return 'components/validate-bootstrap-default';
    }
  }.property('horizontal'),

  validateStatus: function(){
    // var canValidate = this.get('canValidate'),
    //     isValid = this.get('isValid');
    var isValid = this.get('isValid');
    if (Ember.none(isValid))
      return "";

    return isValid ? "has-success" : "has-error";
  }.property('isValid'),

  labelCol: function(key, values){
    return this._concatColumnClass(arguments.length > 1 ? values : this.get('defaultLabelCol'));
  }.property(),

  inputCol: function(key, values){
    return this._concatColumnClass(arguments.length > 1 ? values : this.get('defaultInputCol'));
  }.property(),

  /**
   * [_concatColumnClass description]
   *
   * @private
   * @param  {[type]} col [description]
   * @return {[type]}     [description]
   */
  _concatColumnClass: function(col){
    var mode = this.getWithDefault('columnMode', 'md'),
        str = ['col', mode, col];
    return str.join('-');
  }
});
