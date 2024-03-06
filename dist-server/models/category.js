"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Schema = _mongoose["default"].Schema;
var categorySchema = new Schema({
  name: {
    type: String,
    required: true
  }
});
var categoryModel = _mongoose["default"].model("category", categorySchema);
var _default = exports["default"] = categoryModel;