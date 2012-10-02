define(["jquery", "backbone"], function($, Backbone) {

  // Parse the search params into an object
  var Querystring = (function() {
    function Querystring() {}
    Querystring.getParams = function() {
      if (!this.paramsObj) {
        var d, kv, param, params, search, _i, _len;
        params = {};
        search = window.location.search.slice(1).split("&");
        if (search.length > 0) {
          _results = [];
          for (_i = 0, _len = search.length; _i < _len; _i++) {
            param = search[_i];
            kv = param.split("=");
            d = decodeURIComponent;
            if (kv[0] !== "") {
              params[d(kv[0])] = d(kv[1].replace(/\+/g, " "));
            }
          }
          this.paramsObj = params;
        }
      }
      return this.paramsObj;
    };
    return Querystring;
  })();  

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
      var form = this.$("#add-item");
      var params = form.formParams();
      var model = new Item(params);
      model.save({}, {
        success: function (model, response) {
          form.clearForm();         
          if (Querystring.getParams()["v"]) {
            self.close();
          }
        }
      });
    },
    initialize: function () {
    
      var params = Querystring.getParams();

      // If there are params in the URL, load them into the form
      if (params["v"]) {
        if (params["t"]) {
          this.$("#name").val(params["t"]);
        }
        
        if (params["s"]) {
          this.$("#details").val(params["s"]);
        }
        
        if (params["u"]) {
          this.$("#url").val(params["u"]);
          this.$("#type").val("link");
        }
      }      
    }
  });

  var addView = new AddView();
  return "Initialized";
});
