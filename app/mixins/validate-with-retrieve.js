import Ember from 'ember';
import ValidateWithComponent from '../components/validate-with';

export default Ember.Mixin.create({
  validateWith: null,

  /**
   * find parent compnent view 'validate-with', then manually add
   * a observer method on 'errors' property.
   */
  didInsertElement: function(){
    var view = this.get('parentView');

    while (view) {
      if(ValidateWithComponent.prototype.isPrototypeOf(view)) {
        this.set('validateWith', view);
        return;
      }
      view = view.get('parentView');
    }
  }
});
