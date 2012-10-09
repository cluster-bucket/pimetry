define(["jquery", "underscore", "backbone", "../collections/items", "./item", "bootstrap"], 
function($, _, Backbone, Items, ItemView) {
  var ShowView = Backbone.View.extend({
    render: function (collection) {
      _.each(collection.models, function (model) {
        var options, view, parentId, parent;
        options = this.itemOptions;
        options.model = model;
        view = new ItemView(options);
        
        parentId = model.get("parent");
        console.log("parent", parentId);
        if (parentId && parentId !== "") {
          parent = this.$("#" + parentId + " .children").eq(0);
        }
        
        if (!parent || parent.length < 1) {
          parent = this.$el;
        }

        parent.append(view.render().el);
        
      }, this);
      return this;
    },
    initialize: function (options) {
    
      this.itemOptions = options.itemOptions || {};
    
      this.items = new Items();
      this.items.bind("reset", function(collection, options) {
        this.render(collection);
        this.$el.collapse();
      }, this);
      
      this.items.fetch();
    }
  });
  return ShowView; 
});
