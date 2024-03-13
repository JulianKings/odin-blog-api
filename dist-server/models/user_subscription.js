"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Schema = _mongoose["default"].Schema;
var userSubscriptionSchema = new Schema({
  mail: {
    type: String,
    required: true
  }
});
var userSubscriptionModel = _mongoose["default"].model("user_subscription", userSubscriptionSchema);
var _default = exports["default"] = userSubscriptionModel;