'use strict';

var React = require('react');

var WholeSymbol = React.createClass({
  // Define propTypes only in development.
  propTypes: __DEV__ && {
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
          onMouseLeave={this.props.onMouseLeave}
          onMouseMove={this.props.onMouseMove}>
        {iconNode}
      </span>
    );
  }
});

module.exports = WholeSymbol;
