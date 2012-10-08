define(["jquery", "backbone", "underscore"], function($, Backbone, _) {
  var ItemView = Backbone.View.extend({
    // tagName: "div",
    // className: "accordion-group",

    render: function () {
      if (this.tagName === "div") {
        this.$el.html(this.template(this.model.toJSON()));
      } else if (this.tagName === "option") {
        this.$el.attr("id", this.model.get("id"));
        this.$el.val(this.model.get("id"));
        this.$el.text(this.model.get("text"));
      }
      return this;
    },
    initialize: function () {
      if (this.tagName === "div") {
        this.template = _.template($("#item-template").html());
      }
    }
  });
  return ItemView;
});
