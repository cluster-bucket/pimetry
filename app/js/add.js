define(["./config"], function(config) {
  require(["views/add"], function(AddView) {
    var addView = new AddView();
  });
});
