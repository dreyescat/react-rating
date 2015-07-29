'use strict';
 
var React = require('react');
var Style = require('./style');
var Symbol = require('./PercentageSymbol');

var Rating = React.createClass({
  // Define propTypes only in development.
  propTypes: __DEV__ && { 
    start: React.PropTypes.number,
    stop: React.PropTypes.number,
    step: React.PropTypes.number,
    initialRate: React.PropTypes.number,
    empty: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object]),
    full: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object]),
    readonly: React.PropTypes.bool,
    fractions: React.PropTypes.number,
    scale: React.PropTypes.number,
    onChange: React.PropTypes.func
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
      onChange: function (rate) {}
    };
  },
  getInitialState: function () {
    return {
      index: this._contains(this.props.initialRate) ?
        this._rateToIndex(this.props.initialRate) : undefined,
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
    this.setState({
      indexOver: undefined
    });
  },
  handleMouseMove: function (i, event) {
    var index = i + this._fractionalIndex(event);
    if (this.state.indexOver !== index) {
      this.setState({
        indexOver: index
      });
    }
  },
  // Calculate the rate of an index according the the start and step.
  _indexToRate: function (index) {
    return this.props.start + Math.floor(index) * this.props.step +
      this.props.step * this._roundToFraction(index % 1);
  },
  // Calculate the corresponding index for a rate.
  _rateToIndex: function (rate) {
    return (rate - this.props.start) / this.props.step;
  },
  // Check the rate is in the proper range [start..stop].
  _contains: function (rate) {
    var start = this.props.step > 0 ? this.props.start : this.props.stop;
    var stop = this.props.step > 0 ? this.props.stop : this.props.start;
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
    // The symbol with the mouse over prevails over the selected one.
    var index = this.state.indexOver !== undefined ?
      this.state.indexOver : this.state.index;
    // Fill symbols until the selected one.
    for (var i = 0; i < Math.floor(index); i++) {
      symbolNodes.push(<Symbol
          key={i}
          background={this.props.empty}
          icon={this.props.full}
          percent={100}
          onMouseDown={!this.props.readonly && this.handleMouseDown.bind(this, i)}
          onMouseLeave={!this.props.readonly && this.handleMouseLeave.bind(this, i)}
          onMouseMove={!this.props.readonly && this.handleMouseMove.bind(this, i)}
          />);
    }
    // Partially fill the selected one.
    if (index !== undefined && index % 1 !== 0 ) {
      symbolNodes.push(<Symbol
          key={i}
          background={this.props.empty}
          icon={this.props.full}
          percent={index % 1 * 100}
          onMouseDown={!this.props.readonly && this.handleMouseDown.bind(this, i)}
          onMouseLeave={!this.props.readonly && this.handleMouseLeave.bind(this, i)}
          onMouseMove={!this.props.readonly && this.handleMouseMove.bind(this, i)}
          />);
      i += 1;
    }
    // Leave the rest empty.
    for (; i < this._rateToIndex(this.props.stop); i++) {
      symbolNodes.push(<Symbol
          key={i}
          background={this.props.empty}
          icon={this.props.empty}
          percent={0}
          onMouseDown={!this.props.readonly && this.handleMouseDown.bind(this, i)}
          onMouseLeave={!this.props.readonly && this.handleMouseLeave.bind(this, i)}
          onMouseMove={!this.props.readonly && this.handleMouseMove.bind(this, i)}
          />);
    }
    return (
      <div>
        {symbolNodes}
      </div>
    );
  }
});

module.exports = Rating;
