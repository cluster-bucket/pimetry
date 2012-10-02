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
    undersore: {
      deps: [],
      exports: "_"
    }
  }
});
 
require(["app"], function(app) {
  // use app here
  console.log(app);
});
