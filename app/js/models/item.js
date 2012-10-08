define(["backbone"], function(Backbone) {
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
  return Item;
});


