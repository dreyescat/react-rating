'use strict';

import React from 'react';
import PropTypes from 'prop-types'

// Return the corresponding React node for an icon.
const _iconNode = (icon) => {
  // If it is already a React Element just return it.
  if (React.isValidElement(icon)) {
    return icon;
  }
  // If it is an object, try to use it as a CSS style object.
  if (typeof icon === 'object' && icon !== null) {
    return <span style={icon}/>;
  }
  // If it is a string, use it as class names.
  if (Object.prototype.toString.call(icon) === '[object String]') {
    return <span className={icon}/>;
  }
};

const RatingSymbol = (props) => {
  const backgroundNode = _iconNode(props.background);
  const iconNode = _iconNode(props.icon);
  const iconContainerStyle = {
    display: 'inline-block',
    position: 'absolute',
    overflow: 'hidden',
    top: 0,
    [props.direction === 'rtl' ? 'right' : 'left']: 0,
    width: props.percent !== undefined ?
      props.percent + '%' :
      'auto'
  };
  const style = {
    cursor: !props.readonly ?
      'pointer' :
      'auto',
    display: 'inline-block',
    position: 'relative'
  };

  return (
    <span
      style={style}>
      {backgroundNode}
      <span style={iconContainerStyle}>
        {iconNode}
      </span>
    </span>
  );
}

// Define propTypes only in development. They will be void in production.
RatingSymbol.propTypes = typeof __DEV__ !== 'undefined' && __DEV__ && {
  icon: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object,
    React.PropTypes.element
  ]),
  background: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.element
  ]),
  percent: React.PropTypes.number,
  direction: React.PropTypes.string
};

module.exports = RatingSymbol;
