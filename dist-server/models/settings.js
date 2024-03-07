"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Schema = _mongoose["default"].Schema;
var settingsSchema = new Schema({
  featured_article: {
    type: Schema.Types.ObjectId,
    ref: "article",
    required: true
  }
});
var settingsModel = _mongoose["default"].model("settings", settingsSchema);
var _default = exports["default"] = settingsModel;