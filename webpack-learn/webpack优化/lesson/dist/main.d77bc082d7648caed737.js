(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ 8:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(0);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/react-dom/index.js
var react_dom = __webpack_require__(1);
var react_dom_default = /*#__PURE__*/__webpack_require__.n(react_dom);

// CONCATENATED MODULE: ./src/child/child.jsx


class child_Child extends react["Component"] {
  render() {
    return react_default.a.createElement("div", null, react_default.a.createElement("div", null, "this is Child"));
  }

}
react_dom_default.a.render(react_default.a.createElement(child_Child, null), document.getElementById("root"));
// CONCATENATED MODULE: ./src/index.js




class src_App extends react["Component"] {
  render() {
    return react_default.a.createElement("div", null, react_default.a.createElement("div", null, "this is App"), react_default.a.createElement(child_Child, null));
  }

}

react_dom_default.a.render(react_default.a.createElement(src_App, null), document.getElementById("root"));

/***/ })

},[[8,1,2]]]);
//# sourceMappingURL=main.d77bc082d7648caed737.js.map