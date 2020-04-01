"use strict";

var a = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return setTimeout(function () {
              console.log(1);
            }, 1000);

          case 2:
            console.log(2);
          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function a() {
    return _ref.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { 
  return function () { 
    var gen = fn.apply(this, arguments);   //执行generator函数
    return new Promise(function (resolve, reject) { 
      function step(key, arg) { 
        try { 
          var info = gen[key](arg); 
          var value = info.value; 
        } catch (error) { 
          reject(error); return; 
        } 
        if (info.done) { 
          resolve(value); 
        } else { 
          return Promise.resolve(value).then(function (value) { 
            step("next", value); 
          }, function (err) { 
            step("throw", err); 
          }); 
        } 
      } 
      return step("next"); 
    }); 
  }; 
}
