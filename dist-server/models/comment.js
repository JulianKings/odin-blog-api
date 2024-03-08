"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Schema = _mongoose["default"].Schema;
var commentSchema = new Schema({
  message: {
    type: String,
    required: true
  },
  article: {
    type: Schema.Types.ObjectId,
    ref: "article",
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  timestamp: {
    type: Date,
    required: true
  }
});
var commentModel = _mongoose["default"].model("comment", commentSchema);
var _default = exports["default"] = commentModel;