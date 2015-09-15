'use strict';

var React = require('react');

var PercentageSymbol = React.createClass({
  // Define propTypes only in development. They will be void in production.
  propTypes: typeof __DEV__ !== 'undefined' && __DEV__ && {
    icon: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object]),
    background: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object]),
    percent: React.PropTypes.number
  },
  render: function () {
    var backgroundNode = typeof this.props.background === 'string' ?
      <div className={this.props.background}/> :
      <div style={this.props.background}/>;
    var iconNode = typeof this.props.icon === 'string' ?
      <div className={this.props.icon}/> :
      <div style={this.props.icon}/>;
    var iconContainerStyle = {
      display: 'inline-block',
      position: 'absolute',
      overflow: 'hidden',
      top: 0,
      left: 0,
      width: this.props.percent !== undefined ?
        this.props.percent + '%' :
        'auto'
    };
    var style = {
      cursor: this.props.onMouseDown || this.props.onMouseOver ?
        'pointer' :
        'auto',
      display: 'inline-block',
      position: 'relative'
    };
    return (
      <span style={style}
          onMouseDown={this.props.onMouseDown}
          onMouseMove={this.props.onMouseMove}>
        {backgroundNode}
        <div style={iconContainerStyle}>
          {iconNode}
        </div>
      </span>
    );
  }
});

module.exports = PercentageSymbol;
