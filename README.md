ember-cli-ember-validations
===========================

Ember Validations for Ember-cli


INSTALL
=======

```bash
npm install ember-cli-ember-validations --save
```

USAGE
=====

in your model javascript

```js
// app/models/user.js

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
```

in your template 

```handlebars
{{!app/templates/index.hbs}}
{{#validate-with propertyBinding="user.login"}}
  <label>
    {{validate-message}}
  </label>
  {{input value=user.login}}
{{/validate-with}}

```
