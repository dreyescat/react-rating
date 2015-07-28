'use strict';

var React = require('react');

var WholeSymbol = React.createClass({
  propTypes: {
    icon: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object]),
  },
  render: function () {
    var iconNode = typeof this.props.icon === 'string' ?
      <span className={this.props.icon}/> :
      <span style={this.props.icon}/>;
    return (
      <span onMouseDown={this.props.onMouseDown}
          onMouseOver={this.props.onMouseOver}
          onMouseLeave={this.props.onMouseLeave}>
        {iconNode}
      </span>
    );
  }
});

module.exports = WholeSymbol;
