define(["jquery", "backbone", "../models/item"], function($, Backbone, Item) {
  var Items = Backbone.Collection.extend({
    url: "api/item",
    model: Item
  });
  return Items; 
});
