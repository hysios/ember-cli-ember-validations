import Ember from 'ember';

export default Ember.Controller.extend({
  user: function(){
    return this.store.createRecord('user');
  }.property()
});
