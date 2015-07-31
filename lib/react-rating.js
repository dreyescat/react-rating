/*! react-rating - 0.0.11 | (c) 2015, 2015  dreyescat | MIT | https://github.com/dreyescat/react-rating */
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
	var Symbol = __webpack_require__(4);

	var Rating = React.createClass({
	  displayName: 'Rating',

	  // Define propTypes only in development.
	  propTypes: (true) && {
	    start: React.PropTypes.number,
	    stop: React.PropTypes.number,
	    step: React.PropTypes.number,
	    initialRate: React.PropTypes.number,
	    empty: React.PropTypes.oneOfType([
	    // Array of class names and/or style objects.
	    React.PropTypes.arrayOf(React.PropTypes.oneOfType[(React.PropTypes.string, React.PropTypes.object)]),
	    // Class names.
	    React.PropTypes.string,
	    // Style objects.
	    React.PropTypes.object]),
	    full: React.PropTypes.oneOfType([
	    // Array of class names and/or style objects.
	    React.PropTypes.arrayOf(React.PropTypes.oneOfType[(React.PropTypes.string, React.PropTypes.object)]),
	    // Class names.
	    React.PropTypes.string,
	    // Style objects.
	    React.PropTypes.object]),
	    readonly: React.PropTypes.bool,
	    fractions: React.PropTypes.number,
	    scale: React.PropTypes.number,
	    onChange: React.PropTypes.func,
	    onRate: React.PropTypes.func
	  },
	  getDefaultProps: function getDefaultProps() {
	    return {
	      start: 0,
	      stop: 5,
	      step: 1,
	      empty: Style.empty,
	      full: Style.full,
	      fractions: 1,
	      scale: 3,
	      onChange: function onChange(rate) {},
	      onRate: function onRate(rate) {}
	    };
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    this.setState({
	      index: this._initialIndex(nextProps)
	    });
	  },
	  getInitialState: function getInitialState() {
	    return {
	      index: this._initialIndex(this.props),
	      indexOver: undefined
	    };
	  },
	  handleMouseDown: function handleMouseDown(i, event) {
	    var index = i + this._fractionalIndex(event);
	    if (this.state.index !== index) {
	      this.props.onChange(this._indexToRate(index));
	      this.setState({
	        index: index
	      });
	    }
	    console.log(this._indexToRate(index));
	  },
	  handleMouseLeave: function handleMouseLeave(i) {
	    this.props.onRate();
	    this.setState({
	      indexOver: undefined
	    });
	  },
	  handleMouseMove: function handleMouseMove(i, event) {
	    var index = i + this._fractionalIndex(event);
	    if (this.state.indexOver !== index) {
	      this.props.onRate(this._indexToRate(index));
	      this.setState({
	        indexOver: index
	      });
	    }
	  },
	  _initialIndex: function _initialIndex(props) {
	    if (this._contains(props.initialRate)) {
	      return this._rateToIndex(props.initialRate);
	    }
	  },
	  // Calculate the rate of an index according the the start and step.
	  _indexToRate: function _indexToRate(index) {
	    return this.props.start + Math.floor(index) * this.props.step + this.props.step * this._roundToFraction(index % 1);
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
	  _roundToFraction: function _roundToFraction(index) {
	    // Get the closest top fraction.
	    var fraction = Math.ceil(index % 1 * this.props.fractions) / this.props.fractions;
	    // Truncate decimal trying to avoid float precission issues.
	    var precision = Math.pow(10, this.props.scale);
	    return Math.floor(index) + Math.floor(fraction * precision) / precision;
	  },
	  _fractionalIndex: function _fractionalIndex(event) {
	    var x = event.clientX - event.currentTarget.getBoundingClientRect().left;
	    return this._roundToFraction(x / event.currentTarget.offsetWidth);
	  },
	  render: function render() {
	    var symbolNodes = [];
	    var empty = [].concat(this.props.empty);
	    var full = [].concat(this.props.full);
	    // The symbol with the mouse over prevails over the selected one.
	    var index = this.state.indexOver !== undefined ? this.state.indexOver : this.state.index;
	    // The index of the last full symbol or NaN if index is undefined.
	    var lastFullIndex = Math.floor(index);
	    for (var i = 0; i < this._rateToIndex(this.props.stop); i++) {
	      // Return the percentage of the decimal part of the last full index,
	      // 100 percent for those below the last full index or 0 percent for those
	      // indexes NaN or above the last full index.
	      var percent = i - lastFullIndex === 0 ? index % 1 * 100 : i - lastFullIndex < 0 ? 100 : 0;
	      symbolNodes.push(React.createElement(Symbol, {
	        key: i,
	        background: empty[i % empty.length],
	        icon: full[i % full.length],
	        percent: percent,
	        onMouseDown: !this.props.readonly && this.handleMouseDown.bind(this, i),
	        onMouseLeave: !this.props.readonly && this.handleMouseLeave.bind(this, i),
	        onMouseMove: !this.props.readonly && this.handleMouseMove.bind(this, i)
	      }));
	    }
	    return React.createElement(
	      'span',
	      null,
	      symbolNodes
	    );
	  }
	});

	module.exports = Rating;

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

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var PercentualSymbol = React.createClass({
	  displayName: 'PercentualSymbol',

	  // Define propTypes only in development. They will be void in production.
	  propTypes: (true) && {
	    icon: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object]),
	    background: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object]),
	    percent: React.PropTypes.number
	  },
	  render: function render() {
	    var backgroundNode = typeof this.props.background === 'string' ? React.createElement('div', { className: this.props.background }) : React.createElement('div', { style: this.props.background });
	    var iconNode = typeof this.props.icon === 'string' ? React.createElement('div', { className: this.props.icon }) : React.createElement('div', { style: this.props.icon });
	    var iconContainerStyle = {
	      display: 'inline-block',
	      position: 'absolute',
	      overflow: 'hidden',
	      left: 0,
	      width: this.props.percent !== undefined ? this.props.percent + '%' : 'auto'
	    };
	    var style = {
	      display: 'inline-block',
	      position: 'relative'
	    };
	    return React.createElement(
	      'span',
	      { style: style,
	        onMouseDown: this.props.onMouseDown,
	        onMouseOver: this.props.onMouseOver,
	        onMouseLeave: this.props.onMouseLeave,
	        onMouseMove: this.props.onMouseMove },
	      backgroundNode,
	      React.createElement(
	        'div',
	        { style: iconContainerStyle },
	        iconNode
	      )
	    );
	  }
	});

	module.exports = PercentualSymbol;

/***/ }
/******/ ])
});
;