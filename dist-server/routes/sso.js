"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
var _express = _interopRequireDefault(require("express"));
var _ssoController = _interopRequireDefault(require("../controllers/ssoController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _default(passport) {
  var router = _express["default"].Router();
  var controller = (0, _ssoController["default"])(passport);
  router.get('/', controller.sso_check);
  router.post('/comment', controller.sso_post_comment);
  return router;
}