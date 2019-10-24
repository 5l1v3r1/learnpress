this["LP"] = this["LP"] || {}; this["LP"]["singleCourse"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./assets/src/js/frontend/single-course.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/src/js/frontend/single-course.js":
/*!*************************************************!*\
  !*** ./assets/src/js/frontend/single-course.js ***!
  \*************************************************/
<<<<<<< HEAD
/*! exports provided: init */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/babel-loader/lib/index.js):\nError: ENOENT: no such file or directory, open '/Users/tu/Documents/foobla/repo/LearnPress/assets/src/js/frontend/single-course.js'");
=======
/*! exports provided: formatDuration, toggleSidebarHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatDuration", function() { return formatDuration; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toggleSidebarHandler", function() { return toggleSidebarHandler; });
/* harmony import */ var _single_course_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./single-course/index */ "./assets/src/js/frontend/single-course/index.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }


var $ = jQuery;
var _lodash = lodash,
    debounce = _lodash.debounce;
var _x = wp.i18n._x;
function formatDuration(seconds) {
  var html;
  var x, d;
  var day_in_seconds = 3600 * 24;

  if (seconds > day_in_seconds) {
    d = (seconds - seconds % day_in_seconds) / day_in_seconds;
    seconds = seconds % day_in_seconds;
  } else if (seconds == day_in_seconds) {
    return '24:00';
  }

  x = new Date(seconds * 1000).toUTCString().match(/\d{2}:\d{2}:\d{2}/)[0].split(':');

  if (x[2] === '00') {
    x.splice(2, 1);
  }

  if (x[0] === '00') {
    x[0] = 0;
  }

  if (d) {
    x[0] = parseInt(x[0]) + d * 24;
  }

  html = x.join(':');
  return html;
}

var toggleSidebarHandler = function toggleSidebarHandler(event) {
  LP.Cookies.set('sidebar-toggle', event.target.checked);
};



var createCustomScrollbar = function createCustomScrollbar(element) {
  [].map.call(arguments, function (element) {
    $(element).each(function () {
      $(this).addClass('scrollbar-light').css({
        opacity: 1
      }).scrollbar({
        scrollx: false
      }).parent().css({
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: '100%',
        opacity: 1
      });
    });
  });
};

var AjaxSearchCourses = function AjaxSearchCourses(el) {
  var $form = $(el);
  var $ul = $('<ul class="search-results"></ul>').appendTo($form);
  var $input = $form.find('input[name="s"]');
  var paged = 1;

  var submit =
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(e) {
      var response, _response$results, courses, num_pages, page;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              e.preventDefault();
              _context.next = 3;
              return wp.apiFetch({
                path: 'lp/v1/courses/search?s=' + $input.val() + '&page=' + paged
              });

            case 3:
              response = _context.sent;
              _response$results = response.results, courses = _response$results.courses, num_pages = _response$results.num_pages, page = _response$results.page;
              $ul.html('');

              if (courses.length) {
                courses.map(function (course) {
                  $ul.append("<li class=\"search-results__item\">\n                    <a href=\"".concat(course.url, "\">\n                    ") + (course.thumbnail.small ? "<img src=\"".concat(course.thumbnail.small, "\" />") : '') + "\n                        <h4 class=\"search-results__item-title\">".concat(course.title, "</h4>\n                        <span class=\"search-results__item-author\">").concat(course.author, "</span>\n                        ").concat(course.price_html, "\n                        </a>\n                    </li>"));
                });

                if (num_pages > 1) {
                  $ul.append("<li class=\"search-results__pagination\">\n                  " + _toConsumableArray(Array(num_pages).keys()).map(function (i) {
                    return i === paged - 1 ? '<span>' + (i + 1) + '</span>' : '<a data-page="' + (i + 1) + '">' + (i + 1) + '</a>';
                  }).join('') + "\n                </li>");
                }
              } else {
                $ul.append('<li class="search-results__not-found">' + _x('No course found!', 'ajax search course not found', 'learnpress') + '</li>');
              }

              $form.addClass('searching');
              return _context.abrupt("return", false);

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function submit(_x2) {
      return _ref.apply(this, arguments);
    };
  }();

  $input.on('keyup', debounce(function (e) {
    paged = 1;

    if (e.target.value.length < 3) {
      return;
    }

    submit(e);
  }, 300));
  $form.on('click', '.clear', function () {
    $form.removeClass('searching');
    $input.val('');
  }).on('click', '.search-results__pagination a', function (e) {
    e.preventDefault();
    paged = $(e.target).data('page');
    submit(e);
  });
};

$(window).on('load', function () {
  var $popup = $('#popup-course');
  var timerClearScroll;
  var $curriculum = $('#learn-press-course-curriculum'); // Popup only

  if ($popup.length) {
    $curriculum.scroll(lodash.throttle(function () {
      var $self = $(this);
      $self.addClass('scrolling');
      timerClearScroll && clearTimeout(timerClearScroll);
      timerClearScroll = setTimeout(function () {
        $self.removeClass('scrolling');
      }, 1000);
    }, 500));
    $('#sidebar-toggle').on('change', toggleSidebarHandler);
    new AjaxSearchCourses($popup.find('.search-course'));
    createCustomScrollbar($curriculum.find('.curriculum-scrollable'), $('#popup-content').find('.content-item-scrollable'));
    LP.toElement('.course-item.current', {
      container: '.curriculum-scrollable:eq(1)',
      offset: 200
    });
  }

  $curriculum.find('.section-desc').each(function (i, el) {
    var a = $('<span class="show-desc"></span>').on('click', function () {
      b.toggleClass('c');
    });
    var b = $(el).siblings('.section-title').append(a);
  });
  LP.Hook.doAction('course-ready'); // if (window.location.hash) {
  //     $('.content-item-scrollable:last').scrollTo($(window.location.hash));
  // }
});

/***/ }),

/***/ "./assets/src/js/frontend/single-course/index.js":
/*!*******************************************************!*\
  !*** ./assets/src/js/frontend/single-course/index.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _learnpress_quiz__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @learnpress/quiz */ "@learnpress/quiz");
/* harmony import */ var _learnpress_quiz__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_learnpress_quiz__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./store */ "./assets/src/js/frontend/single-course/store/index.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_store__WEBPACK_IMPORTED_MODULE_2__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var SingleCourse =
/*#__PURE__*/
function (_Component) {
  _inherits(SingleCourse, _Component);

  function SingleCourse() {
    _classCallCheck(this, SingleCourse);

    return _possibleConstructorReturn(this, _getPrototypeOf(SingleCourse).apply(this, arguments));
  }

  _createClass(SingleCourse, [{
    key: "render",
    value: function render() {
      return React.createElement(React.Fragment, null, "this is course", React.createElement(_learnpress_quiz__WEBPACK_IMPORTED_MODULE_1___default.a, null));
    }
  }]);

  return SingleCourse;
}(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (SingleCourse);

/***/ }),

/***/ "./assets/src/js/frontend/single-course/store/index.js":
/*!*************************************************************!*\
  !*** ./assets/src/js/frontend/single-course/store/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Created by tu on 9/19/19.
 */

/***/ }),

/***/ "@learnpress/quiz":
/*!***************************************!*\
  !*** external {"this":["LP","quiz"]} ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["LP"]["quiz"]; }());

/***/ }),

/***/ "@wordpress/element":
/*!******************************************!*\
  !*** external {"this":["wp","element"]} ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["wp"]["element"]; }());
>>>>>>> feature/4.0

/***/ })

/******/ });
//# sourceMappingURL=single-course.js.map