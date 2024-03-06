"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _luxon = require("luxon");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Schema = _mongoose["default"].Schema;
var articleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "category",
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
  },
  likes: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String
  }
});
articleSchema.virtual("formatted_timestamp").get(function () {
  return this.timestamp ? _luxon.DateTime.fromJSDate(this.timestamp).toLocaleString(_luxon.DateTime.DATE_MED) : '';
});
articleSchema.virtual("image_url").get(function () {
  return this.imageUrl === '' ? './assets/newspaper.webp' : this.imageUrl;
});
var articleModel = _mongoose["default"].model("article", articleSchema);
var _default = exports["default"] = articleModel;