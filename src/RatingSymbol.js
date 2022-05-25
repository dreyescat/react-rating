import React from 'react';
import PropTypes from 'prop-types';

// Return the corresponding React node for an icon.
const _iconNode = (icon) => {
  // If it is already a React Element just return it.
  if (React.isValidElement(icon)) {
    return icon;
  }
  // If it is an object, try to use it as a CSS style object.
  if (typeof icon === 'object' && icon !== null) {
    return <span style={icon} />;
  }
  // If it is a string, use it as class names.
  if (Object.prototype.toString.call(icon) === '[object String]') {
    return <span className={icon} />;
  }
};

class RatingSymbol extends React.PureComponent {
  render() {
    const {
      index,
      inactiveIcon,
      activeIcon,
      percent,
      direction,
      readonly,
      onClick,
      onMouseMove,
      onTouchEnd
    } = this.props;
    const backgroundNode = _iconNode(inactiveIcon);
    const showbgIcon = percent < 100;
    const bgIconContainerStyle = showbgIcon
      ? {}
      : {
        visibility: 'hidden'
      };
    const iconNode = _iconNode(activeIcon);
    const iconContainerStyle = {
      display: 'inline-block',
      position: 'absolute',
      overflow: 'hidden',
      top: 0,
      [direction === 'rtl' ? 'right' : 'left']: 0,
      width: `${percent}%`
    };
    const style = {
      cursor: !readonly ? 'pointer' : 'not-allowed',
      display: 'inline-block',
      position: 'relative'
    };

    function handleMouseMove(e) {
      if (onMouseMove) {
        onMouseMove(index, e);
      }
    }

    function handleMouseClick(e) {
      if (onClick) {
        // [Supporting both TouchEvent and MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/Touch_events/Supporting_both_TouchEvent_and_MouseEvent)
        // We must prevent firing click event twice on touch devices.
        e.preventDefault();
        onClick(index, e);
      }
    }

    function handleTouchEnd(e) {
      if (onTouchEnd) {
        onTouchEnd(index, e);
      }
    }

    return (
      <span
        style={style}
        onClick={handleMouseClick}
        onMouseMove={handleMouseMove}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleTouchEnd}
      >
        <span style={bgIconContainerStyle}>
          {backgroundNode}
        </span>
        <span style={iconContainerStyle}>
          {iconNode}
        </span>
      </span>
    );
  }
}

// Define propTypes only in development. They will be void in production.
RatingSymbol.propTypes = typeof __DEV__ !== 'undefined' && __DEV__ && {
  index: PropTypes.number.isRequired,
  readonly: PropTypes.bool.isRequired,
  inactiveIcon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.element
  ]).isRequired,
  activeIcon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.element
  ]).isRequired,
  percent: PropTypes.number.isRequired,
  direction: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onMouseMove: PropTypes.func,
  onTouchMove: PropTypes.func,
  onTouchEnd: PropTypes.func
};

export default RatingSymbol;
