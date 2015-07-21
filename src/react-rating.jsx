 'use strict'
 
var React = require('react');
var Style = require('./style');

var Symbol = React.createClass({
  render: function () {
    return (
      <span onMouseDown={this.props.onMouseDown}
          onMouseOver={this.props.onMouseOver}
          onMouseLeave={this.props.onMouseLeave}>
        <span style={this.props.style} className={this.props.className}/>
      </span>
    );
  }
});

var Rating = React.createClass({
  propTypes: {
    start: React.PropTypes.number,
    stop: React.PropTypes.number,
    step: React.PropTypes.number,
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
      index: undefined,
      indexOver: undefined
    };
  },
  handleMouseDown: function (i) {
    var index = this.state.index;
    this.setState({
      index: i 
    });
    if (index !== i) {
      this.props.onChange(this._indexToRate(i));
    }
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
  render: function () {
    var symbolNodes = [];
    for (var i = 0; i <= this._rateToIndex(this.props.stop); i++) {
      // The symbol with the mouse over prevails over the selected one.
      var index = this.state.indexOver !== undefined ?
        this.state.indexOver : this.state.index;
      // The symbol can be defined as an style object or class names.
      var symbol = i <= index ? this.props.full : this.props.empty;
      var className = typeof symbol === 'string' ? symbol : '';
      var style = typeof symbol === 'object' ? symbol : {};
      symbolNodes.push(<Symbol key={i}
          className={className}
          style={style}
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

module.exports = window.Rating = Rating; 
