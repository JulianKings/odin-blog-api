"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
var _comment = _interopRequireDefault(require("../models/comment"));
var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));
var _expressValidator = require("express-validator");
var _article_like = _interopRequireDefault(require("../models/article_like"));
var _article = _interopRequireDefault(require("../models/article"));
var _article_saved = _interopRequireDefault(require("../models/article_saved"));
var _user = _interopRequireDefault(require("../models/user"));
var _user_subscription = _interopRequireDefault(require("../models/user_subscription"));
var _category = _interopRequireDefault(require("../models/category"));
var _settings = _interopRequireDefault(require("../models/settings"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _default(passport) {
  return {
    sso_check: (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res, next) {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              res.json({
                user: req.user
              });
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      return function (_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      };
    }()),
    sso_post_comment: [
    // Validate and sanitize fields.
    (0, _expressValidator.body)("comment", "comment must not be empty.").trim().isLength({
      min: 1
    }).escape(), (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res, next) {
        var errors, newComment, result, responseObject;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              errors = (0, _expressValidator.validationResult)(req);
              if (!errors.isEmpty()) {
                _context2.next = 10;
                break;
              }
              // valid comment
              newComment = new _comment["default"]({
                message: req.body.comment,
                article: req.body.article_id,
                author: req.user._id,
                timestamp: new Date()
              });
              _context2.next = 5;
              return newComment.save();
            case 5:
              _context2.next = 7;
              return _context2.sent.populate("author");
            case 7:
              result = _context2.sent;
              responseObject = {
                responseStatus: 'validComment',
                commentResult: result
              };
              res.json(responseObject);
            case 10:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      return function (_x4, _x5, _x6) {
        return _ref2.apply(this, arguments);
      };
    }())],
    sso_check_like: (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res, next) {
        var responseObject, findLike, _responseObject, _responseObject2;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              if (!(req.params.id.length < 24)) {
                _context3.next = 3;
                break;
              }
              // No results
              responseObject = {
                responseStatus: 'invalidArticleId'
              };
              return _context3.abrupt("return", res.json(responseObject));
            case 3:
              _context3.next = 5;
              return _article_like["default"].findOne({
                user: req.user._id,
                article: req.params.id
              });
            case 5:
              findLike = _context3.sent;
              if (findLike) {
                _context3.next = 11;
                break;
              }
              _responseObject = {
                responseStatus: 'articleLikeNotFound'
              };
              return _context3.abrupt("return", res.json(_responseObject));
            case 11:
              _responseObject2 = {
                responseStatus: 'articleLikeFound'
              };
              return _context3.abrupt("return", res.json(_responseObject2));
            case 13:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      return function (_x7, _x8, _x9) {
        return _ref3.apply(this, arguments);
      };
    }()),
    sso_do_like: (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res, next) {
        var responseObject, findLike, likedArticle, updatedArticle, newLike, _responseObject3, _responseObject4;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              if (!(req.params.id.length < 24)) {
                _context4.next = 3;
                break;
              }
              // No results
              responseObject = {
                responseStatus: 'invalidArticleId'
              };
              return _context4.abrupt("return", res.json(responseObject));
            case 3:
              _context4.next = 5;
              return _article_like["default"].findOne({
                user: req.user._id,
                article: req.params.id
              });
            case 5:
              findLike = _context4.sent;
              if (findLike) {
                _context4.next = 19;
                break;
              }
              _context4.next = 9;
              return _article["default"].findById(req.params.id);
            case 9:
              likedArticle = _context4.sent;
              if (!likedArticle) {
                _context4.next = 17;
                break;
              }
              updatedArticle = new _article["default"]({
                title: likedArticle.title,
                description: likedArticle.description,
                message: likedArticle.message,
                status: likedArticle.status,
                category: likedArticle.category,
                author: likedArticle.author,
                timestamp: likedArticle.timestamp,
                likes: likedArticle.likes + 1,
                imageUrl: likedArticle.imageUrl,
                _id: likedArticle._id
              });
              newLike = new _article_like["default"]({
                user: req.user._id,
                article: req.params.id
              });
              _context4.next = 15;
              return Promise.all([_article["default"].findByIdAndUpdate(likedArticle._id, updatedArticle, {}), newLike.save()]);
            case 15:
              _responseObject3 = {
                responseStatus: 'articleLiked'
              };
              return _context4.abrupt("return", res.json(_responseObject3));
            case 17:
              _context4.next = 21;
              break;
            case 19:
              _responseObject4 = {
                responseStatus: 'articleAlreadyLiked'
              };
              return _context4.abrupt("return", res.json(_responseObject4));
            case 21:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }));
      return function (_x10, _x11, _x12) {
        return _ref4.apply(this, arguments);
      };
    }()),
    sso_check_saved_article: (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res, next) {
        var responseObject, findSaved, _responseObject5, _responseObject6;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              if (!(req.params.id.length < 24)) {
                _context5.next = 3;
                break;
              }
              // No results
              responseObject = {
                responseStatus: 'invalidArticleId'
              };
              return _context5.abrupt("return", res.json(responseObject));
            case 3:
              _context5.next = 5;
              return _article_saved["default"].findOne({
                user: req.user._id,
                article: req.params.id
              });
            case 5:
              findSaved = _context5.sent;
              if (findSaved) {
                _context5.next = 11;
                break;
              }
              _responseObject5 = {
                responseStatus: 'articleSavedNotFound'
              };
              return _context5.abrupt("return", res.json(_responseObject5));
            case 11:
              _responseObject6 = {
                responseStatus: 'articleSavedFound'
              };
              return _context5.abrupt("return", res.json(_responseObject6));
            case 13:
            case "end":
              return _context5.stop();
          }
        }, _callee5);
      }));
      return function (_x13, _x14, _x15) {
        return _ref5.apply(this, arguments);
      };
    }()),
    sso_do_save_article: (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res, next) {
        var responseObject, findSaved, likedArticle, newSaved, _responseObject7, _responseObject8;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              if (!(req.params.id.length < 24)) {
                _context6.next = 3;
                break;
              }
              // No results
              responseObject = {
                responseStatus: 'invalidArticleId'
              };
              return _context6.abrupt("return", res.json(responseObject));
            case 3:
              _context6.next = 5;
              return _article_saved["default"].findOne({
                user: req.user._id,
                article: req.params.id
              });
            case 5:
              findSaved = _context6.sent;
              if (findSaved) {
                _context6.next = 18;
                break;
              }
              _context6.next = 9;
              return _article["default"].findById(req.params.id);
            case 9:
              likedArticle = _context6.sent;
              if (!likedArticle) {
                _context6.next = 16;
                break;
              }
              newSaved = new _article_saved["default"]({
                user: req.user._id,
                article: req.params.id
              });
              _context6.next = 14;
              return newSaved.save();
            case 14:
              _responseObject7 = {
                responseStatus: 'articleSaved'
              };
              return _context6.abrupt("return", res.json(_responseObject7));
            case 16:
              _context6.next = 22;
              break;
            case 18:
              _context6.next = 20;
              return _article_saved["default"].findByIdAndDelete(findSaved._id);
            case 20:
              _responseObject8 = {
                responseStatus: 'articleRemovedSave'
              };
              return _context6.abrupt("return", res.json(_responseObject8));
            case 22:
            case "end":
              return _context6.stop();
          }
        }, _callee6);
      }));
      return function (_x16, _x17, _x18) {
        return _ref6.apply(this, arguments);
      };
    }()),
    get_saved_articles: (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res, next) {
        var allArticles, responseObject;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return _article_saved["default"].find({
                user: req.user._id
              }).populate("article").exec();
            case 2:
              allArticles = _context7.sent;
              responseObject = {
                responseStatus: 'validRequest',
                articles: allArticles
              };
              return _context7.abrupt("return", res.json(responseObject));
            case 5:
            case "end":
              return _context7.stop();
          }
        }, _callee7);
      }));
      return function (_x19, _x20, _x21) {
        return _ref7.apply(this, arguments);
      };
    }()),
    housekeeping_get_dashboard: (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res, next) {
        var _yield$Promise$all, _yield$Promise$all2, allArticles, allComments, subscriptionCount, articleCount, authorCount, responseObject;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return Promise.all([_article["default"].find().sort({
                timestamp: -1
              }).limit(6).populate("author").exec(), _comment["default"].find().sort({
                timestamp: -1
              }).limit(6).populate("author").exec(), _user_subscription["default"].countDocuments({}).exec(), _article["default"].countDocuments({}).exec(), _user["default"].countDocuments({
                $or: [{
                  membership_role: 'administrator'
                }, {
                  membership_role: 'author'
                }]
              }).exec()]);
            case 2:
              _yield$Promise$all = _context8.sent;
              _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 5);
              allArticles = _yield$Promise$all2[0];
              allComments = _yield$Promise$all2[1];
              subscriptionCount = _yield$Promise$all2[2];
              articleCount = _yield$Promise$all2[3];
              authorCount = _yield$Promise$all2[4];
              responseObject = {
                responseStatus: 'validRequest',
                article_count: articleCount,
                author_count: authorCount,
                subscription_count: subscriptionCount,
                articles: allArticles,
                comments: allComments
              };
              return _context8.abrupt("return", res.json(responseObject));
            case 11:
            case "end":
              return _context8.stop();
          }
        }, _callee8);
      }));
      return function (_x22, _x23, _x24) {
        return _ref8.apply(this, arguments);
      };
    }()),
    housekeeping_get_categories: (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
      var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res, next) {
        var categories, responseObject;
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return _category["default"].find({}).exec();
            case 2:
              categories = _context9.sent;
              responseObject = {
                responseStatus: 'validRequest',
                categories: categories
              };
              return _context9.abrupt("return", res.json(responseObject));
            case 5:
            case "end":
              return _context9.stop();
          }
        }, _callee9);
      }));
      return function (_x25, _x26, _x27) {
        return _ref9.apply(this, arguments);
      };
    }()),
    housekeeping_post_add_category: [
    // Validate and sanitize fields.
    (0, _expressValidator.body)("category", "Category name must not be empty.").trim().isLength({
      min: 1
    }).escape().custom( /*#__PURE__*/function () {
      var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(value) {
        var category;
        return _regeneratorRuntime().wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return _category["default"].findOne({
                name: value
              });
            case 2:
              category = _context10.sent;
              if (!category) {
                _context10.next = 5;
                break;
              }
              throw new Error('This category already exists.');
            case 5:
            case "end":
              return _context10.stop();
          }
        }, _callee10);
      }));
      return function (_x28) {
        return _ref10.apply(this, arguments);
      };
    }()), (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
      var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res, next) {
        var errors, newCategory, responseObject, _responseObject9;
        return _regeneratorRuntime().wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              errors = (0, _expressValidator.validationResult)(req);
              if (!errors.isEmpty()) {
                _context11.next = 10;
                break;
              }
              if (!(req.user.role === 'administrator')) {
                _context11.next = 8;
                break;
              }
              newCategory = new _category["default"]({
                name: req.body.category
              });
              _context11.next = 6;
              return newCategory.save();
            case 6:
              responseObject = {
                responseStatus: 'categoryAdded'
              };
              res.json(responseObject);
            case 8:
              _context11.next = 12;
              break;
            case 10:
              // send response with errors
              _responseObject9 = {
                responseStatus: 'categoryError',
                errors: errors.array()
              };
              return _context11.abrupt("return", res.json(_responseObject9));
            case 12:
            case "end":
              return _context11.stop();
          }
        }, _callee11);
      }));
      return function (_x29, _x30, _x31) {
        return _ref11.apply(this, arguments);
      };
    }())],
    housekeeping_delete_category: (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
      var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(req, res, next) {
        var responseObject, _responseObject10, articlesByCategory, _responseObject11, _responseObject12;
        return _regeneratorRuntime().wrap(function _callee12$(_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              if (!(req.body.category_id.length < 24)) {
                _context12.next = 3;
                break;
              }
              // No results
              responseObject = {
                responseStatus: 'invalidCategoryId'
              };
              return _context12.abrupt("return", res.json(responseObject));
            case 3:
              if (!(req.user.role !== 'administrator')) {
                _context12.next = 6;
                break;
              }
              _responseObject10 = {
                responseStatus: 'notEnoughPermissions'
              };
              return _context12.abrupt("return", res.json(_responseObject10));
            case 6:
              _context12.next = 8;
              return _article["default"].find({
                category: req.body.category_id
              }).exec();
            case 8:
              articlesByCategory = _context12.sent;
              if (!(articlesByCategory.length > 0)) {
                _context12.next = 14;
                break;
              }
              _responseObject11 = {
                responseStatus: 'confirmDeletion'
              };
              return _context12.abrupt("return", res.json(_responseObject11));
            case 14:
              _context12.next = 16;
              return _category["default"].findByIdAndDelete(req.body.category_id);
            case 16:
              _responseObject12 = {
                responseStatus: 'categoryDeleted'
              };
              return _context12.abrupt("return", res.json(_responseObject12));
            case 18:
            case "end":
              return _context12.stop();
          }
        }, _callee12);
      }));
      return function (_x32, _x33, _x34) {
        return _ref12.apply(this, arguments);
      };
    }()),
    housekeeping_get_category: (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
      var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(req, res, next) {
        var responseObject, _responseObject13, categoryResult, _responseObject14, _responseObject15;
        return _regeneratorRuntime().wrap(function _callee13$(_context13) {
          while (1) switch (_context13.prev = _context13.next) {
            case 0:
              if (!(req.params.id.length < 24)) {
                _context13.next = 3;
                break;
              }
              // No results
              responseObject = {
                responseStatus: 'invalidCategoryId'
              };
              return _context13.abrupt("return", res.json(responseObject));
            case 3:
              if (!(req.user.role !== 'administrator')) {
                _context13.next = 6;
                break;
              }
              _responseObject13 = {
                responseStatus: 'notEnoughPermissions'
              };
              return _context13.abrupt("return", res.json(_responseObject13));
            case 6:
              _context13.next = 8;
              return _category["default"].findOne({
                _id: req.params.id
              }).exec();
            case 8:
              categoryResult = _context13.sent;
              if (categoryResult) {
                _context13.next = 14;
                break;
              }
              _responseObject14 = {
                responseStatus: 'unknownCategory'
              };
              return _context13.abrupt("return", res.json(_responseObject14));
            case 14:
              _responseObject15 = {
                responseStatus: 'categoryFound',
                category: categoryResult
              };
              return _context13.abrupt("return", res.json(_responseObject15));
            case 16:
            case "end":
              return _context13.stop();
          }
        }, _callee13);
      }));
      return function (_x35, _x36, _x37) {
        return _ref13.apply(this, arguments);
      };
    }()),
    housekeeping_put_edit_category: [
    // Validate and sanitize fields.
    (0, _expressValidator.body)("category", "Category name must not be empty.").trim().isLength({
      min: 1
    }).escape().custom( /*#__PURE__*/function () {
      var _ref14 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(value) {
        var category;
        return _regeneratorRuntime().wrap(function _callee14$(_context14) {
          while (1) switch (_context14.prev = _context14.next) {
            case 0:
              _context14.next = 2;
              return _category["default"].findOne({
                name: value
              });
            case 2:
              category = _context14.sent;
              if (!category) {
                _context14.next = 5;
                break;
              }
              throw new Error('This category already exists.');
            case 5:
            case "end":
              return _context14.stop();
          }
        }, _callee14);
      }));
      return function (_x38) {
        return _ref14.apply(this, arguments);
      };
    }()), (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
      var _ref15 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(req, res, next) {
        var errors, updatedCategory, responseObject, _responseObject16;
        return _regeneratorRuntime().wrap(function _callee15$(_context15) {
          while (1) switch (_context15.prev = _context15.next) {
            case 0:
              errors = (0, _expressValidator.validationResult)(req);
              if (!errors.isEmpty()) {
                _context15.next = 10;
                break;
              }
              if (!(req.user.role === 'administrator')) {
                _context15.next = 8;
                break;
              }
              updatedCategory = new _category["default"]({
                name: req.body.category,
                _id: req.body.category_id
              });
              _context15.next = 6;
              return _category["default"].findByIdAndUpdate(req.body.category_id, updatedCategory, {});
            case 6:
              responseObject = {
                responseStatus: 'categoryUpdated'
              };
              res.json(responseObject);
            case 8:
              _context15.next = 12;
              break;
            case 10:
              // send response with errors
              _responseObject16 = {
                responseStatus: 'categoryError',
                errors: errors.array()
              };
              return _context15.abrupt("return", res.json(_responseObject16));
            case 12:
            case "end":
              return _context15.stop();
          }
        }, _callee15);
      }));
      return function (_x39, _x40, _x41) {
        return _ref15.apply(this, arguments);
      };
    }())],
    housekeeping_get_category_deletion: (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
      var _ref16 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(req, res, next) {
        var responseObject, _responseObject17, categoryResult, _responseObject18, articlesByCategory, _responseObject19;
        return _regeneratorRuntime().wrap(function _callee16$(_context16) {
          while (1) switch (_context16.prev = _context16.next) {
            case 0:
              if (!(req.params.id.length < 24)) {
                _context16.next = 3;
                break;
              }
              // No results
              responseObject = {
                responseStatus: 'invalidCategoryId'
              };
              return _context16.abrupt("return", res.json(responseObject));
            case 3:
              if (!(req.user.role !== 'administrator')) {
                _context16.next = 6;
                break;
              }
              _responseObject17 = {
                responseStatus: 'notEnoughPermissions'
              };
              return _context16.abrupt("return", res.json(_responseObject17));
            case 6:
              _context16.next = 8;
              return _category["default"].findOne({
                _id: req.params.id
              }).exec();
            case 8:
              categoryResult = _context16.sent;
              if (categoryResult) {
                _context16.next = 14;
                break;
              }
              _responseObject18 = {
                responseStatus: 'unknownCategory'
              };
              return _context16.abrupt("return", res.json(_responseObject18));
            case 14:
              _context16.next = 16;
              return _article["default"].find({
                category: req.params.id
              }).sort({
                timestamp: -1
              }).exec();
            case 16:
              articlesByCategory = _context16.sent;
              _responseObject19 = {
                responseStatus: 'categoryFound',
                category: categoryResult,
                articles: articlesByCategory
              };
              return _context16.abrupt("return", res.json(_responseObject19));
            case 19:
            case "end":
              return _context16.stop();
          }
        }, _callee16);
      }));
      return function (_x42, _x43, _x44) {
        return _ref16.apply(this, arguments);
      };
    }()),
    housekeeping_force_delete_category: (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
      var _ref17 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(req, res, next) {
        var responseObject, _responseObject20, articlesByCategory, featuredArticleArray, articleArray, featuredArticle, _responseObject21, _responseObject22, _responseObject23;
        return _regeneratorRuntime().wrap(function _callee17$(_context17) {
          while (1) switch (_context17.prev = _context17.next) {
            case 0:
              if (!(req.body.category_id.length < 24)) {
                _context17.next = 3;
                break;
              }
              // No results
              responseObject = {
                responseStatus: 'invalidCategoryId'
              };
              return _context17.abrupt("return", res.json(responseObject));
            case 3:
              if (!(req.user.role !== 'administrator')) {
                _context17.next = 6;
                break;
              }
              _responseObject20 = {
                responseStatus: 'notEnoughPermissions',
                error: "You don't have enough permissions for this action."
              };
              return _context17.abrupt("return", res.json(_responseObject20));
            case 6:
              _context17.next = 8;
              return _article["default"].find({
                category: req.body.category_id
              }).exec();
            case 8:
              articlesByCategory = _context17.sent;
              if (!(articlesByCategory.length > 0)) {
                _context17.next = 27;
                break;
              }
              featuredArticleArray = [];
              articleArray = [];
              articlesByCategory.forEach(function (article) {
                articleArray.push(article._id);
                featuredArticleArray.push({
                  featured_article: article._id
                });
              });
              featuredArticle = _settings["default"].findOne({
                $or: featuredArticleArray
              }).exec();
              if (featuredArticle) {
                _context17.next = 23;
                break;
              }
              _context17.next = 17;
              return _article["default"].deleteMany({
                _id: {
                  $in: articleArray
                }
              });
            case 17:
              _context17.next = 19;
              return _category["default"].findByIdAndDelete(req.body.category_id);
            case 19:
              _responseObject21 = {
                responseStatus: 'categoryDeleted'
              };
              return _context17.abrupt("return", res.json(_responseObject21));
            case 23:
              _responseObject22 = {
                responseStatus: 'categoryHasFeaturedArticle',
                error: "This category has a featured article, therefore it can't be deleted."
              };
              return _context17.abrupt("return", res.json(_responseObject22));
            case 25:
              _context17.next = 31;
              break;
            case 27:
              _context17.next = 29;
              return _category["default"].findByIdAndDelete(req.body.category_id);
            case 29:
              _responseObject23 = {
                responseStatus: 'categoryDeleted'
              };
              return _context17.abrupt("return", res.json(_responseObject23));
            case 31:
            case "end":
              return _context17.stop();
          }
        }, _callee17);
      }));
      return function (_x45, _x46, _x47) {
        return _ref17.apply(this, arguments);
      };
    }()),
    housekeeping_get_settings: (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
      var _ref18 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18(req, res, next) {
        var _yield$Promise$all3, _yield$Promise$all4, articles, settings, responseObject;
        return _regeneratorRuntime().wrap(function _callee18$(_context18) {
          while (1) switch (_context18.prev = _context18.next) {
            case 0:
              _context18.next = 2;
              return Promise.all([_article["default"].find({}).exec(), _settings["default"].findOne({})]);
            case 2:
              _yield$Promise$all3 = _context18.sent;
              _yield$Promise$all4 = _slicedToArray(_yield$Promise$all3, 2);
              articles = _yield$Promise$all4[0];
              settings = _yield$Promise$all4[1];
              responseObject = {
                responseStatus: 'validRequest',
                articles: articles,
                settings: settings
              };
              return _context18.abrupt("return", res.json(responseObject));
            case 8:
            case "end":
              return _context18.stop();
          }
        }, _callee18);
      }));
      return function (_x48, _x49, _x50) {
        return _ref18.apply(this, arguments);
      };
    }()),
    housekeeping_put_edit_settings: (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
      var _ref19 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee19(req, res, next) {
        var updatedSetting, responseObject;
        return _regeneratorRuntime().wrap(function _callee19$(_context19) {
          while (1) switch (_context19.prev = _context19.next) {
            case 0:
              if (!(req.user.role === 'administrator')) {
                _context19.next = 6;
                break;
              }
              updatedSetting = new _category["default"]({
                featured_article: req.body.featured_article,
                _id: req.body.settings_id
              });
              _context19.next = 4;
              return _settings["default"].findByIdAndUpdate(req.body.settings_id, updatedSetting, {});
            case 4:
              responseObject = {
                responseStatus: 'settingsUpdated'
              };
              res.json(responseObject);
            case 6:
            case "end":
              return _context19.stop();
          }
        }, _callee19);
      }));
      return function (_x51, _x52, _x53) {
        return _ref19.apply(this, arguments);
      };
    }())
  };
}