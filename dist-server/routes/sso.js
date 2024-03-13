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
  router.get('/check_like/:id', controller.sso_check_like);
  router.get('/do_like/:id', controller.sso_do_like);
  router.get('/check_saved_article/:id', controller.sso_check_saved_article);
  router.get('/do_save_article/:id', controller.sso_do_save_article);
  router.get('/get_saved_articles', controller.get_saved_articles);
  router.get('/admin/dashboard', controller.housekeeping_get_dashboard);
  return router;
}