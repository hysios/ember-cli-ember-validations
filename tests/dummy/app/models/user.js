import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend(Ember.Validations.Mixin, {
  login: DS.attr('string'),
  email: DS.attr('string'),
  password: DS.attr('string'),
  passwordConfirmation: DS.attr('string'),
  level: DS.attr('string'),
  agreement: DS.attr('boolean'),
  hobbies: DS.attr('string'),
  occupation: DS.attr('string'),

  validations: {
    login: {
      presence: true,
      length: { minimum: 5 },
      numericality: true
    },

    password: {
      presence: true,
      length: { minimum: 6 },
      confirmation: { message: "password should be the same!"}
    },

    email: {
      presence: true,
      format: { with: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i }
    },

    level: {
      presence: true
    },
    agreement: {
      acceptance: true
    },
    hobbies: {
      presence: {
        message: '至少选择一个爱好'
      }
    },
    occupation: {
      inclusion: {
        'in': ['0', '1'],
        message: '职业必须是教师或公务员'
      }
    }
  }
});
