import Ember from 'ember';
import ValidateBootstrapComponent from './validate-bootstrap';

var IS_GLOBAL = /^([A-Z$]|([0-9][A-Z$]))/;

/**
  Returns true if the provided path is global (e.g., `MyApp.fooController.bar`)
  instead of local (`foo.bar.baz`).

  @method isGlobalPath
  @for Ember
  @private
  @param {String} path
  @return Boolean
*/
function isGlobalPath(path) {
  return IS_GLOBAL.test(path);
};

function getWithGlobals(obj, path) {
  return get(isGlobalPath(path) ? Ember.lookup : obj, path);
};

function getBindingPath(binding, obj) {
  var from = binding._from;

  if (isGlobalPath(from)) {
    return from
  } else {
    return from.slice(from.indexOf('.') + 1);
  }
}

var EXTERNAL_PATHS = /(\w+\.context|\w+)\./;

/**
 * "input-validate" extends ValidateWithComponent and provided a inline syntax
 * for simple case use.
 */
export default ValidateBootstrapComponent.extend({

  template: function(){
    var propertyBinding = this.get('propertyBinding'),
        bindingPath = this.obtainExternalPathFromBoundObject(propertyBinding);

    return Ember.Handlebars.compile(
      '{{input valueBinding="' + bindingPath + '" class="form-control"}}'
    );
  }.property(),

  obtainExternalPathFromBoundObject: function(binding) {
    var from = binding._from;
    if (isGlobalPath(from)) {
      return from;
    } else {
      return from.replace(EXTERNAL_PATHS, '');
    }
  }
});
