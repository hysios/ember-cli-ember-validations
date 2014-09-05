import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend(Ember.Validations.Mixin, {
  login: DS.attr('string'),
  age: DS.attr('number'),

  validations: {
    login: {
      presence: true,
      length: { minimum: 5 }
    },
    age: {

    }
  }
});
