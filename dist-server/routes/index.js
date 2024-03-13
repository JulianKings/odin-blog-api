"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _indexController = require("../controllers/indexController");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.get('/', function (req, res, next) {});
router.post('/subscribe', _indexController.post_subscription);
var _default = exports["default"] = router;