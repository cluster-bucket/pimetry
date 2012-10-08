require.config({
 paths: {
    backbone: 'lib/backbone',
    bootstrap: 'lib/bootstrap',
    underscore: 'lib/underscore',
    jquery: 'lib/jquery.min'
  },
  shim: {
    app: {
      deps: ["bootstrap"]
    },
    backbone: {
      deps: ["underscore"],
      exports: "Backbone"
    },
    bootstrap: {
      deps: ["jquery"],
      exports: "$.fn.alert"
    },
    underscore: {
      deps: [],
      exports: "_"
    }
  }
});

require(["jquery"], function($) {
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
});
