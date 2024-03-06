"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
var _express = _interopRequireDefault(require("express"));
var _loginController = _interopRequireDefault(require("../controllers/loginController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _default(passport) {
  var router = _express["default"].Router();
  var controller = (0, _loginController["default"])(passport);
  router.post('/', controller.post_login);
  return router;
}