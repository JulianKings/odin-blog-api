"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _articleController = require("../controllers/articleController");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.get('/', _articleController.articles_all);
router.get('/all', _articleController.articles_all);
router.get('/popular', _articleController.articles_all_popular);
var _default = exports["default"] = router;