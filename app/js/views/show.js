define(["jquery", "underscore", "backbone", "../collections/items", "./item", "bootstrap"], 
function($, _, Backbone, Items, ItemView) {
  var ShowView = Backbone.View.extend({
    render: function (collection) {
      _.each(collection.models, function (model) {
        var options, view;
        
        options = this.itemOptions;
        options.model = model;
        
        view = new ItemView(options);
        this.$el.append(view.render().el);
        
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
