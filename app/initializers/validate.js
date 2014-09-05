import Ember from 'ember';
import ValidateWithComponent from '../components/validate-with';

export default {
  name: 'ember-validate',

  initialize: function(){
    var helpers = Ember.Handlebars.helpers;

    Ember.Handlebars.registerHelper('validate', function(options){
      return helpers.view.call(this, ValidateWithComponent, options);
    })

  }
}
