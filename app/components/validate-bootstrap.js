import Ember from 'ember';
import ValidateWithComponent from './validate-with';

export default ValidateWithComponent.extend({
  classNames: ['form-group', 'has-feedback'],
  classNameBindings: ['validateStatus'],
  horizontal: false,
  defaultLabelCol: 2,
  defaultInputCol: 10,

  /**
   * layoutName return different layoutName depends on horizontal property
   * @property {String}
   */
  layoutName: function() {
    var isHorizontal = this.get('horizontal'),
        templateNames = [ isHorizontal ? 'components/validate-bootstrap-horizontal' :  'components/validate-bootstrap-default'];

    if (this.get('inputType')){
      templateNames.push('input-type');
    }

    return templateNames.join('-');
  }.property('horizontal'),

  inputTypeClass: function(){
    var inputTypes = ['checkbox', 'radio'],
        type = this.get('inputType');

    return inputTypes.indexOf(type) > -1 ? type : '';
  }.property(),

  validateStatus: function(){
    var canValidate = this.get('canValidate'),
        isValid = this.get('isValid');

    if (!canValidate)
      return "";

    return isValid ? "has-success" : "has-error";
  }.property('isValid', 'canValidate'),

  labelCol: function(key, values){
    return this._concatColumnClass(arguments.length > 1 ? values : this.get('defaultLabelCol'));
  }.property(),

  inputCol: function(key, values){
    return this._concatColumnClass(arguments.length > 1 ? values : this.get('defaultInputCol'));
  }.property(),

  labelOffsetCol: function(key, values){
    return this._concatColumnClass(
      arguments.length > 1 ? values : this.get('defaultLabelCol'),
      true);
  }.property(),

  /**
   * [_concatColumnClass description]
   *
   * @private
   * @param  {[type]} col [description]
   * @return {[type]}     [description]
   */
  _concatColumnClass: function(col, offset){

    var mode, str, offset;

    if (typeof offset === 'undefined') {
      offset = false;
    }

    mode = this.getWithDefault('columnMode', 'md');
    str = ['col', mode, offset ? 'offset-' + col : col];
    return str.join('-');
  }
});
