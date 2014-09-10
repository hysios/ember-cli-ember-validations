import Ember from 'ember';

export default Ember.Object.extend(Ember.Validations.Mixin, {
  myLength: null,
  myUrl: null,

  validations: {
    myLength: {
      length: { minimum: 5 }
    },
    myUrl: {
      url: { allowUserPass: true }
    }
  }
});
