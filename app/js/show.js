define(["./config"], function(config) {
  require(["jquery", "views/show"], function($, ShowView) {
    var showView = new ShowView({
      el: $("#list"),
      itemOptions: {
        tagName: "div",
        className: "accordion-group"
      }
    });
  });
});
