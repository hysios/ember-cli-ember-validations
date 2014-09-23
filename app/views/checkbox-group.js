import Ember from 'ember';

export default Ember.CollectionView.extend({
  selectedValues: [],
  classNames: ['clearfix'],

  itemViewClass: Ember.View.extend({
    templateName: 'components/checkbox',
    classNames: ['checkbox-item'],
    checked: null,

    click: function(){
      var parentView = this.get('parentView'),
        value = this.get('content.value'),
        selectedValues = parentView.get('selectedValues'),
        validateModel,
        controller;

      if(this.get('checked')) {
        this.set('checked', false);
        var index = selectedValues.indexOf(value);

        if(index > -1) {
          selectedValues.splice(index, 1);
        }
      }else{
        this.set('checked', true);
        selectedValues.push(value);
      }

      validateModel = this.get('parentView.validateModel');
      controller = this.get('controller');
      controller.set(validateModel, selectedValues.join(','));
    }
  })
});
