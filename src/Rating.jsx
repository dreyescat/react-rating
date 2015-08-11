'use strict';

var React = require('react');
var Style = require('./style');
var Symbol = require('./PercentageSymbol');

var Rating = React.createClass({
  // Define propTypes only in development.
  propTypes: typeof __DEV__ !== 'undefined' && __DEV__ && {
    start: React.PropTypes.number,
    stop: React.PropTypes.number,
    step: React.PropTypes.number,
    initialRate: React.PropTypes.number,
    empty: React.PropTypes.oneOfType([
      // Array of class names and/or style objects.
      React.PropTypes.arrayOf(React.PropTypes.oneOfType[
        React.PropTypes.string,
        React.PropTypes.object
      ]),
      // Class names.
      React.PropTypes.string,
      // Style objects.
      React.PropTypes.object]),
    full: React.PropTypes.oneOfType([
      // Array of class names and/or style objects.
      React.PropTypes.arrayOf(React.PropTypes.oneOfType[
        React.PropTypes.string,
        React.PropTypes.object
      ]),
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
  getDefaultProps: function () {
    return {
      start: 0,
      stop: 5,
      step: 1,
      empty: Style.empty,
      full: Style.full,
      fractions: 1,
      scale: 3,
      onChange: function (rate) {},
      onRate: function (rate) {}
    };
  },
  componentWillReceiveProps: function (nextProps) {
    this.setState({
      index: this._initialIndex(nextProps)
    });
  },
  getInitialState: function () {
    return {
      index: this._initialIndex(this.props),
      indexOver: undefined
    };
  },
  handleMouseDown: function (i, event) {
    var index = i + this._fractionalIndex(event);
    if (this.state.index !== index) {
      this.props.onChange(this._indexToRate(index));
      this.setState({
        index: index
      });
    }
    console.log(this._indexToRate(index));
  },
  handleMouseLeave: function (i) {
    this.props.onRate();
    this.setState({
      indexOver: undefined
    });
  },
  handleMouseMove: function (i, event) {
    var index = i + this._fractionalIndex(event);
    if (this.state.indexOver !== index) {
      this.props.onRate(this._indexToRate(index));
      this.setState({
        indexOver: index
      });
    }
  },
  _initialIndex: function (props) {
    if (this._contains(props.initialRate, props)) {
      return this._rateToIndex(props.initialRate, props);
    }
  },
  // Calculate the rate of an index according the the start and step.
  _indexToRate: function (index) {
    return this.props.start + Math.floor(index) * this.props.step +
      this.props.step * this._roundToFraction(index % 1);
  },
  // Calculate the corresponding index for a rate according to the provided
  // props or this.props.
  _rateToIndex: function (rate, props) {
    props = props || this.props;
    return (rate - props.start) / props.step;
  },
  // Check the rate is in the proper range [start..stop] according to
  // the start, stop and step properties in props.
  _contains: function (rate, props) {
    var start = props.step > 0 ? props.start : props.stop;
    var stop = props.step > 0 ? props.stop : props.start;
    return start <= rate && rate <= stop;
  },
  _roundToFraction: function (index) {
    // Get the closest top fraction.
    var fraction = Math.ceil(index % 1 * this.props.fractions) / this.props.fractions;
    // Truncate decimal trying to avoid float precission issues.
    var precision = Math.pow(10, this.props.scale);
    return Math.floor(index) + Math.floor(fraction * precision) / precision;
  },
  _fractionalIndex: function (event) {
    var x = event.clientX - event.currentTarget.getBoundingClientRect().left;
    return this._roundToFraction(x / event.currentTarget.offsetWidth);
  },
  render: function () {
    var symbolNodes = [];
    var empty = [].concat(this.props.empty);
    var full = [].concat(this.props.full);
    // The symbol with the mouse over prevails over the selected one.
    var index = this.state.indexOver !== undefined ?
      this.state.indexOver : this.state.index;
    // The index of the last full symbol or NaN if index is undefined.
    var lastFullIndex = Math.floor(index);
    for (var i = 0; i < this._rateToIndex(this.props.stop); i++) {
      // Return the percentage of the decimal part of the last full index,
      // 100 percent for those below the last full index or 0 percent for those
      // indexes NaN or above the last full index.
      var percent = i - lastFullIndex === 0 ? index % 1 * 100 :
        i - lastFullIndex < 0 ? 100 : 0;
      symbolNodes.push(<Symbol
          key={i}
          background={empty[i % empty.length]}
          icon={full[i % full.length]}
          percent={percent}
          onMouseDown={!this.props.readonly && this.handleMouseDown.bind(this, i)}
          onMouseLeave={!this.props.readonly && this.handleMouseLeave.bind(this, i)}
          onMouseMove={!this.props.readonly && this.handleMouseMove.bind(this, i)}
          />);
    }
    return (
      <span>
        {symbolNodes}
      </span>
    );
  }
});

module.exports = Rating;
