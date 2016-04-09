/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	window.Component = __webpack_require__(1).default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Component = __webpack_require__(2);

	var _Component2 = _interopRequireDefault(_Component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ComponentFactory = function ComponentFactory(elTypeOrData, elParent, data) {
	  _classCallCheck(this, ComponentFactory);

	  var reconstituting = arguments.length < 3;
	  var elType = reconstituting ? elTypeOrData.type : elTypeOrData;
	  elParent = reconstituting ? elTypeOrData.parent : elParent;
	  data = reconstituting ? elTypeOrData.data : data;

	  return new _Component2.default(elType, elParent, data);
	};

	exports.default = ComponentFactory;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ComponentView = __webpack_require__(3);

	var _ComponentView2 = _interopRequireDefault(_ComponentView);

	var _ComponentModel = __webpack_require__(4);

	var _ComponentModel2 = _interopRequireDefault(_ComponentModel);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// AKA "View model"

	var ComponentViewModel = function () {
	  function ComponentViewModel(elType, elParent, data) {
	    _classCallCheck(this, ComponentViewModel);

	    this.type = elType;
	    this.parentSelector = elParent;
	    // Make view and add to DOM
	    var view = new _ComponentView2.default(this.type, data);
	    this.container = document.querySelector(this.parentSelector);
	    this.container.appendChild(view.el);

	    // Make model and associate with view
	    this.model = new _ComponentModel2.default(data, view);

	    this.setBindings();
	  }

	  _createClass(ComponentViewModel, [{
	    key: 'setBindings',
	    value: function setBindings() {
	      var config = { attributes: true, childList: true, characterData: true, subtree: true };
	      var observer = new MutationObserver(function (mutations) {
	        mutations.forEach(function (mutation) {
	          var data = {};
	          var target = mutation.target;
	          if (mutation.type === 'attributes') {
	            var attr = mutation.attributeName;
	            data[attr] = target.getAttribute(attr);
	          } else if (mutation.type === 'childList' || mutation.type === 'subTree') {
	            data.innerHTML = target.innerHTML;
	          } else if (mutation.type === 'characterData') {
	            data.innerHTML = target.data;
	          }

	          this.model.update(data);
	        }.bind(this));
	      }.bind(this));

	      observer.observe(this.model.view.el, config);
	    }
	  }, {
	    key: 'update',
	    value: function update(data) {
	      var view = this.model.update(data);
	      return view;
	    }
	  }, {
	    key: 'toJSON',
	    value: function toJSON() {
	      var obj = {
	        type: this.type,
	        parent: this.parentSelector,
	        data: this.model.values
	      };

	      return JSON.stringify(obj);
	    }
	  }]);

	  return ComponentViewModel;
	}();

	exports.default = ComponentViewModel;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ComponentView = function () {
	  function ComponentView(elType) {
	    _classCallCheck(this, ComponentView);

	    this.el = document.createElement(elType);
	    return this;
	  }

	  _createClass(ComponentView, [{
	    key: "update",
	    value: function update(props) {
	      for (var prop in props) {
	        var val = props[prop];
	        if (prop in this.el) {
	          this.el[prop] = val;
	        } else {
	          this.el.setAttribute(prop, val);
	        }
	      }

	      return this.el;
	    }
	  }]);

	  return ComponentView;
	}();

	exports.default = ComponentView;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ComponentModel = function () {
	  function ComponentModel(values, view) {
	    _classCallCheck(this, ComponentModel);

	    this.view = view;
	    this.values = {};
	    this.update(values);
	    return this;
	  }

	  _createClass(ComponentModel, [{
	    key: "update",
	    value: function update(values) {
	      var el;
	      var changed = {};
	      for (var key in values) {
	        var val = values[key];
	        if (this.values[key] !== val) {
	          this.values[key] = val;
	          changed[key] = val;
	        }
	      }

	      return this.view.update(changed);
	    }
	  }, {
	    key: "toJSON",
	    value: function toJSON() {
	      return JSON.stringify(this.values);
	    }
	  }]);

	  return ComponentModel;
	}();

	exports.default = ComponentModel;

/***/ }
/******/ ]);