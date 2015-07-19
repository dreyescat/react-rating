'use strict';

module.exports = 
  function () {
    var res = {};
    for (var i = 0; i < arguments.length; i++) {
      var obj = arguments[i];
      for (var k in obj) {
        res[k] = obj[k];
      }
    }
    return res;
  };
