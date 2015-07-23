(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReactRating"] = factory(require("react"));
	else
		root["ReactRating"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "/lib";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var Style = __webpack_require__(2);

	var Symbol = React.createClass({
	  displayName: 'Symbol',

	  render: function render() {
	    return React.createElement(
	      'span',
	      { onMouseDown: this.props.onMouseDown,
	        onMouseOver: this.props.onMouseOver,
	        onMouseLeave: this.props.onMouseLeave },
	      React.createElement('span', { style: this.props.style, className: this.props.className })
	    );
	  }
	});

	var Rating = React.createClass({
	  displayName: 'Rating',

	  propTypes: {
	    start: React.PropTypes.number,
	    stop: React.PropTypes.number,
	    step: React.PropTypes.number,
	    initialRate: React.PropTypes.number,
	    empty: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object]),
	    full: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object]),
	    readonly: React.PropTypes.bool,
	    onChange: React.PropTypes.func
	  },
	  getDefaultProps: function getDefaultProps() {
	    return {
	      start: 1,
	      stop: 5,
	      step: 1,
	      empty: Style.empty,
	      full: Style.full,
	      onChange: function onChange(rate) {}
	    };
	  },
	  getInitialState: function getInitialState() {
	    return {
	      index: this._contains(this.props.initialRate) ? this._rateToIndex(this.props.initialRate) : undefined,
	      indexOver: undefined
	    };
	  },
	  handleMouseDown: function handleMouseDown(i) {
	    var index = this.state.index;
	    this.setState({
	      index: i
	    });
	    if (index !== i) {
	      this.props.onChange(this._indexToRate(i));
	    }
	    console.log(this._indexToRate(i));
	  },
	  handleMouseOver: function handleMouseOver(i) {
	    this.setState({
	      indexOver: i
	    });
	  },
	  handleMouseLeave: function handleMouseLeave(i) {
	    this.setState({
	      indexOver: undefined
	    });
	  },
	  // Calculate the rate of an index according the the start and step.
	  _indexToRate: function _indexToRate(index) {
	    return this.props.start + index * this.props.step;
	  },
	  // Calculate the corresponding index for a rate.
	  _rateToIndex: function _rateToIndex(rate) {
	    return (rate - this.props.start) / this.props.step;
	  },
	  // Check the rate is in the proper range [start..stop].
	  _contains: function _contains(rate) {
	    var start = this.props.step > 0 ? this.props.start : this.props.stop;
	    var stop = this.props.step > 0 ? this.props.stop : this.props.start;
	    return start <= rate && rate <= stop;
	  },
	  render: function render() {
	    var symbolNodes = [];
	    for (var i = 0; i <= this._rateToIndex(this.props.stop); i++) {
	      // The symbol with the mouse over prevails over the selected one.
	      var index = this.state.indexOver !== undefined ? this.state.indexOver : this.state.index;
	      // The symbol can be defined as an style object or class names.
	      var symbol = i <= index ? this.props.full : this.props.empty;
	      var className = typeof symbol === 'string' ? symbol : '';
	      var style = typeof symbol === 'object' ? symbol : {};
	      symbolNodes.push(React.createElement(Symbol, { key: i,
	        className: className,
	        style: style,
	        onMouseDown: !this.props.readonly && this.handleMouseDown.bind(this, i),
	        onMouseOver: !this.props.readonly && this.handleMouseOver.bind(this, i),
	        onMouseLeave: !this.props.readonly && this.handleMouseLeave.bind(this, i)
	      }));
	    }
	    return React.createElement(
	      'div',
	      null,
	      symbolNodes
	    );
	  }
	});

	module.exports = window.Rating = Rating;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var merge = __webpack_require__(3);

	var style = {
	  display: 'inline-block',
	  borderRadius: '50%',
	  border: '5px double white',
	  width: 30,
	  height: 30,
	  cursor: 'pointer'
	};

	module.exports = {
	  empty: merge(style, {
	    backgroundColor: '#ccc'
	  }),
	  full: merge(style, {
	    backgroundColor: 'black'
	  })
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function () {
	  var res = {};
	  for (var i = 0; i < arguments.length; i++) {
	    var obj = arguments[i];
	    for (var k in obj) {
	      res[k] = obj[k];
	    }
	  }
	  return res;
	};

/***/ }
/******/ ])
});
;