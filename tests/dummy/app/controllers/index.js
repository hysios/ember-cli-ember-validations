import Ember from 'ember';

export default Ember.Controller.extend({
  user: function(){
    return this.store.createRecord('user');
  }.property(),

  options: function(){
    return ['不及格', '及格', '良好', '优秀'];
  }.property()
});
