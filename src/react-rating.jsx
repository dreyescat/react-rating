'use strict';
 
var React = require('react');
var Style = require('./style');
var Symbol = require('./WholeSymbol');

var Rating = React.createClass({
  propTypes: {
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
    onChange: React.PropTypes.func
  },
  getDefaultProps: function () {
    return {
      start: 1,
      stop: 5,
      step: 1,
      empty: Style.empty,
      full: Style.full,
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
  handleMouseDown: function (i) {
    if (this.state.index !== i) {
      this.props.onChange(this._indexToRate(i));
    }
    this.setState({
      index: i 
    });
    console.log(this._indexToRate(i));
  },
  handleMouseOver: function (i) {
    this.setState({
      indexOver: i
    });
  },
  handleMouseLeave: function (i) {
    this.setState({
      indexOver: undefined
    });
  },
  // Calculate the rate of an index according the the start and step.
  _indexToRate: function (index) {
    return this.props.start + index * this.props.step;
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
  render: function () {
    var symbolNodes = [];
    for (var i = 0; i <= this._rateToIndex(this.props.stop); i++) {
      // The symbol with the mouse over prevails over the selected one.
      var index = this.state.indexOver !== undefined ?
        this.state.indexOver : this.state.index;
      symbolNodes.push(<Symbol key={i}
          icon={i <= index ? this.props.full : this.props.empty}
          onMouseDown={!this.props.readonly && this.handleMouseDown.bind(this, i)}
          onMouseOver={!this.props.readonly && this.handleMouseOver.bind(this, i)}
          onMouseLeave={!this.props.readonly && this.handleMouseLeave.bind(this, i)}
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
