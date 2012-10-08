define(["jquery", "backbone", "../models/item", "../helpers/querystring", "./show"], 
function($, Backbone, Item, Querystring, ShowView) {
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

      var showView = new ShowView({
        el: $("#parent"),
        itemOptions: {
          tagName: "option"
        }
      });
    
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
  return AddView;  
});
