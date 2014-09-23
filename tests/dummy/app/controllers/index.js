import Ember from 'ember';

export default Ember.Controller.extend({
  user: function(){
    return this.store.createRecord('user');
  }.property(),

  options: function(){
    return ['不及格', '及格', '良好', '优秀'];
  }.property(),

  hobbies: function(){
    var hobbies = new Ember.A();
    hobbies.pushObject(Ember.Object.create({
      name: '唱歌', value: 0
    }));
    hobbies.pushObject(Ember.Object.create({
      name: '听音乐', value: 1
    }));
    hobbies.pushObject(Ember.Object.create({
      name: '游泳', value: 2
    }));
    hobbies.pushObject(Ember.Object.create({
      name: '打球', value: 3
    }));
    return hobbies;
  }.property()
});
