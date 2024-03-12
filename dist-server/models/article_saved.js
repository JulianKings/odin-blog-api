"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Schema = _mongoose["default"].Schema;
var articleSavedSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  article: {
    type: Schema.Types.ObjectId,
    ref: "article",
    required: true
  }
});
var articleSavedModel = _mongoose["default"].model("article_saved", articleSavedSchema);
var _default = exports["default"] = articleSavedModel;