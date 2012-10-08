define([], function() {
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
  return Querystring;
});
