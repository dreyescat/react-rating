/*! react-rating - 0.6.0 | (c) 2015, 2016  dreyescat | MIT | https://github.com/dreyescat/react-rating */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReactRating"] = factory(require("react"));
	else
		root["ReactRating"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
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

	module.exports = __webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var React = __webpack_require__(2);
	var Style = __webpack_require__(3);
	var Symbol = __webpack_require__(5);

	// Returns the index of the rate in the range (start, stop, step).
	// Returns undefined index if the rate is outside the range.
	// NOTE: A range.step of 0 produces an empty range and consequently returns an
	// undefined index.
	var indexOf = function indexOf(range, rate) {
	  // Check the rate is in the proper range [start..stop] according to
	  // the start, stop and step properties in props.
	  var step = range.step;
	  var start = step > 0 ? range.start : range.stop;
	  var stop = step > 0 ? range.stop : range.start;
	  if (step && start <= rate && rate <= stop) {
	    // The index corresponds to the number of steps of size props.step
	    // that fits between rate and start.
	    // This index does not need to be a whole number because we can have
	    // fractional symbols, and consequently fractional/float indexes.
	    return (rate - range.start) / step;
	  }
	};

	var Rating = React.createClass({
	  displayName: 'Rating',

	  // Define propTypes only in development.
	  propTypes: "boolean" !== 'undefined' && (true) && {
	    start: React.PropTypes.number,
	    stop: React.PropTypes.number,
	    step: React.PropTypes.number,
	    initialRate: React.PropTypes.number,
	    placeholderRate: React.PropTypes.number,
	    empty: React.PropTypes.oneOfType([
	    // Array of class names and/or style objects.
	    React.PropTypes.arrayOf(React.PropTypes.oneOfType[(React.PropTypes.string, React.PropTypes.object)]),
	    // Class names.
	    React.PropTypes.string,
	    // Style objects.
	    React.PropTypes.object]),
	    placeholder: React.PropTypes.oneOfType([
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
	    quiet: React.PropTypes.bool,
	    fractions: React.PropTypes.number,
	    scale: React.PropTypes.number,
	    onChange: React.PropTypes.func,
	    onClick: React.PropTypes.func,
	    onRate: React.PropTypes.func
	  },
	  getDefaultProps: function getDefaultProps() {
	    return {
	      start: 0,
	      stop: 5,
	      step: 1,
	      empty: Style.empty,
	      placeholder: Style.placeholder,
	      full: Style.full,
	      fractions: 1,
	      scale: 3,
	      onChange: function onChange(rate) {},
	      onClick: function onClick(rate) {},
	      onRate: function onRate(rate) {}
	    };
	  },
	  componentDidMount: function componentDidMount() {
	    this.setState({
	      // detect the computed direction style for the mounted component
	      direction: window.getComputedStyle(this.refs.container, null).getPropertyValue("direction")
	    });
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    var rate = nextProps.initialRate > 0 ? nextProps.initialRate : nextProps.placeholderRate;
	    this.setState({
	      index: indexOf(nextProps, rate)
	    });
	  },
	  getInitialState: function getInitialState() {
	    var index = this.props.initialRate > 0 ? this.props.initialRate : this.props.placeholderRate;
	    return {
	      index: this._rateToIndex(index),
	      indexOver: undefined,
	      // Default direction is left to right
	      direction: 'ltr'
	    };
	  },
	  handleMouseDown: function handleMouseDown(i, event) {
	    var index = i + this._fractionalIndex(event);
	    this.props.onClick(this._indexToRate(index));
	    if (this.state.index !== index) {
	      this.props.onChange(this._indexToRate(index));
	      this.setState({
	        indexOver: undefined,
	        index: index,
	        selected: true
	      });
	    }
	  },
	  handleMouseLeave: function handleMouseLeave() {
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
	  // Calculate the rate of an index according the the start and step.
	  _indexToRate: function _indexToRate(index) {
	    return this.props.start + Math.floor(index) * this.props.step + this.props.step * this._roundToFraction(index % 1);
	  },
	  // Calculate the corresponding index for a rate according to the provided
	  // props or this.props.
	  _rateToIndex: function _rateToIndex(rate) {
	    return indexOf(this.props, rate);
	  },
	  _roundToFraction: function _roundToFraction(index) {
	    // Get the closest top fraction.
	    var fraction = Math.ceil(index % 1 * this.props.fractions) / this.props.fractions;
	    // Truncate decimal trying to avoid float precission issues.
	    var precision = Math.pow(10, this.props.scale);
	    return Math.floor(index) + Math.floor(fraction * precision) / precision;
	  },
	  _fractionalIndex: function _fractionalIndex(event) {
	    var x = this.state.direction === 'rtl' ? event.currentTarget.getBoundingClientRect().right - event.clientX : event.clientX - event.currentTarget.getBoundingClientRect().left;
	    return this._roundToFraction(x / event.currentTarget.offsetWidth);
	  },
	  render: function render() {
	    var symbolNodes = [];
	    var empty = [].concat(this.props.empty);
	    var placeholder = [].concat(this.props.placeholder);
	    var full = [].concat(this.props.full);
	    // The symbol with the mouse over prevails over the selected one,
	    // provided that we are not in quiet mode.
	    var index = !this.props.quiet && this.state.indexOver !== undefined ? this.state.indexOver : this.state.index;
	    // The index of the last full symbol or NaN if index is undefined.
	    var lastFullIndex = Math.floor(index);
	    // Render the number of whole symbols.

	    var icon = !this.state.selected && !this.props.initialRate && this.props.placeholderRate > 0 && this.state.indexOver == undefined ? placeholder : full;

	    for (var i = 0; i < Math.floor(this._rateToIndex(this.props.stop)); i++) {
	      // Return the percentage of the decimal part of the last full index,
	      // 100 percent for those below the last full index or 0 percent for those
	      // indexes NaN or above the last full index.
	      var percent = i - lastFullIndex === 0 ? index % 1 * 100 : i - lastFullIndex < 0 ? 100 : 0;

	      symbolNodes.push(React.createElement(Symbol, {
	        key: i,
	        background: empty[i % empty.length],
	        icon: icon[i % icon.length],
	        percent: percent,
	        onMouseDown: !this.props.readonly && this.handleMouseDown.bind(this, i),
	        onMouseMove: !this.props.readonly && this.handleMouseMove.bind(this, i),
	        direction: this.state.direction
	      }));
	    }
	    var _props = this.props;
	    var start = _props.start;
	    var stop = _props.stop;
	    var step = _props.step;
	    var empty = _props.empty;
	    var initialRate = _props.initialRate;
	    var placeholderRate = _props.placeholderRate;
	    var placeholder = _props.placeholder;
	    var full = _props.full;
	    var readonly = _props.readonly;
	    var quiet = _props.quiet;
	    var fractions = _props.fractions;
	    var scale = _props.scale;
	    var onChange = _props.onChange;
	    var onClick = _props.onClick;
	    var onRate = _props.onRate;

	    var other = _objectWithoutProperties(_props, ['start', 'stop', 'step', 'empty', 'initialRate', 'placeholderRate', 'placeholder', 'full', 'readonly', 'quiet', 'fractions', 'scale', 'onChange', 'onClick', 'onRate']);

	    return React.createElement(
	      'span',
	      _extends({ ref: 'container', onMouseLeave: !readonly && this.handleMouseLeave }, other),
	      symbolNodes
	    );
	  }
	});

	module.exports = Rating;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var merge = __webpack_require__(4);

	var style = {
	  display: 'inline-block',
	  borderRadius: '50%',
	  border: '5px double white',
	  width: 30,
	  height: 30
	};

	module.exports = {
	  empty: merge(style, {
	    backgroundColor: '#ccc'
	  }),
	  full: merge(style, {
	    backgroundColor: 'black'
	  }),
	  placeholder: merge(style, {
	    backgroundColor: 'red'
	  })
	};

/***/ },
/* 4 */
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var React = __webpack_require__(2);

	var PercentageSymbol = React.createClass({
	  displayName: 'PercentageSymbol',

	  // Define propTypes only in development. They will be void in production.
	  propTypes: "boolean" !== 'undefined' && (true) && {
	    icon: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object, React.PropTypes.element]),
	    background: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object, React.PropTypes.element]),
	    percent: React.PropTypes.number
	  },
	  // Return the corresponding React node for an icon.
	  _iconNode: function _iconNode(icon) {
	    // If it is already a React Element just return it.
	    if (React.isValidElement(icon)) {
	      return icon;
	    }
	    // If it is an object, try to use it as a CSS style object.
	    if (typeof icon === 'object' && icon !== null) {
	      return React.createElement('span', { style: icon });
	    }
	    // If it is a string, use it as class names.
	    if (Object.prototype.toString.call(icon) === '[object String]') {
	      return React.createElement('span', { className: icon });
	    }
	  },
	  render: function render() {
	    var _iconContainerStyle;

	    var backgroundNode = this._iconNode(this.props.background);
	    var iconNode = this._iconNode(this.props.icon);
	    var iconContainerStyle = (_iconContainerStyle = {
	      display: 'inline-block',
	      position: 'absolute',
	      overflow: 'hidden',
	      top: 0
	    }, _defineProperty(_iconContainerStyle, this.props.direction === 'rtl' ? 'right' : 'left', 0), _defineProperty(_iconContainerStyle, 'width', this.props.percent !== undefined ? this.props.percent + '%' : 'auto'), _iconContainerStyle);
	    var style = {
	      cursor: this.props.onMouseDown || this.props.onMouseOver ? 'pointer' : 'auto',
	      display: 'inline-block',
	      position: 'relative'
	    };
	    return React.createElement(
	      'span',
	      { style: style,
	        onMouseDown: this.props.onMouseDown,
	        onMouseMove: this.props.onMouseMove },
	      backgroundNode,
	      React.createElement(
	        'span',
	        { style: iconContainerStyle },
	        iconNode
	      )
	    );
	  }
	});

	module.exports = PercentageSymbol;

/***/ }
/******/ ])
});
;