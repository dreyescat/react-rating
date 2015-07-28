'use strict';

var PercentualSymbol = React.createClass({
  propTypes: {
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
      left: 0,
      width: this.props.percent !== undefined ?
        this.props.percent + '%' :
        'auto'
    };
    var style = {
      display: 'inline-block',
      position: 'relative'
    };
    return (
      <span style={style}
          onMouseDown={this.props.onMouseDown}
          onMouseOver={this.props.onMouseOver}
          onMouseLeave={this.props.onMouseLeave}
          onMouseMove={this.props.onMouseMove}>
        {backgroundNode}
        <div style={iconContainerStyle}>
          {iconNode}
        </div>
      </span>
    );
  }
});

module.exports = PercentualSymbol;
