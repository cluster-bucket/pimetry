define(["jquery", "backbone"], function($, Backbone) {
   // Clear a form
   // [Clearing Form Data](http://www.learningjquery.com/2007/08/clearing-form-data)
  $.fn.clearForm = function () {
      return this.each(function () {
          var type = this.type, tag = this.tagName.toLowerCase();
          if (tag === 'form') {
              return $(':input', this).clearForm();
          }
          if (type === 'text' || type === 'password' || tag === 'textarea') {
              this.value = '';
          } else if (type === 'checkbox' || type === 'radio') {
              this.checked = false;
          } else if (tag === 'select') {
              this.selectedIndex = -1;
          }
      });
  };

  // Get all params from a form and put them into an object
  $.fn.formParams = function () {
      var params = {};
      this.each(function () {
          var tmp = $(this).serializeArray();
          $.each(tmp, function (index, param) {
              params[param.name] = param.value;
          });
      });
      return params;
  };

  var Item = Backbone.Model.extend({
    url: "api/item",
    defaults: function () {
      return {
        name: "Item name",
        details: "Item details",
        tags: "example, item"
      };
    },
    initialize: function () {
      if (!this.get("name")) {
        this.set({"name": this.defaults.name});
      }
    }
  });


  var AddView = Backbone.View.extend({
    el: $("#app"),
    events: {
      "click #submit": "add",
      "submit #submit": "add",
      "submit #add-item": "add"
    },
    add: function (e) {
      e.preventDefault();
      var params = this.$el.formParams();
      var model = new Item(params);
      model.save();
    },
    initialize: function () {
      console.log("Initialized add view");
      //this.model.bind("add", function (model, options) {
      //  this.add(model);
      //  this.$el.clearForm();
      //}, this);
    }
  });

  var addView = new AddView();
  return "Initialized";
});
