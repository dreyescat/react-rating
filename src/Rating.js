import React from 'react';
import PropTypes from 'prop-types';
import Symbol from './RatingSymbol';

class Rating extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // Indicates the value that is displayed to the user in the form of symbols.
      // It can be either 0 (for no displayed symbols) or (0, end]
      displayValue: this.props.value,
      // Indicates if the user is currently hovering over the rating element
      interacting: false
    };
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.symbolMouseMove = this.symbolMouseMove.bind(this);
    this.symbolClick = this.symbolClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const valueChanged = this.props.value !== nextProps.value;
    this.setState((prevState) => ({
      displayValue: valueChanged ? nextProps.value : prevState.displayValue
    }));
  }

  componentDidUpdate(prevProps, prevState) {
    // Ignore state update due to value changed from props.
    // Usually originated through an onClick event.
    if (prevProps.value !== this.props.value) {
      return;
    }

    // When hover ends, call this.props.onHover with no value.
    if (prevState.interacting && !this.state.interacting) {
      return this.props.onHover();
    }

    // When hover over.
    if (this.state.interacting) {
      this.props.onHover(this.state.displayValue);
    }
  }

  symbolClick(symbolIndex, event) {
    const value = this.calculateDisplayValue(symbolIndex, event);
    this.props.onClick(value, event);
  }

  symbolMouseMove(symbolIndex, event) {
    const value = this.calculateDisplayValue(symbolIndex, event);
    // This call should cause an update only if the state changes.
    // Mainly the first time the mouse enters and whenever the value changes.
    // So DidComponentUpdate is NOT called for every mouse movement.
    this.setState({
      interacting: !this.props.readonly,
      displayValue: value
    });
  }

  onMouseLeave() {
    this.setState({
      displayValue: this.props.value,
      interacting: false
    });
  }

  calculateDisplayValue(symbolIndex, event) {
    const percentage = this.calculateHoverPercentage(event);
    // Get the closest top fraction.
    const fraction = Math.ceil(percentage % 1 * this.props.fractions) / this.props.fractions;
    // Truncate decimal trying to avoid float precission issues.
    const precision = 10 ** 3;
    const displayValue =
      symbolIndex + (Math.floor(percentage) + Math.floor(fraction * precision) / precision);
    // ensure the returned value is greater than 0 and lower than totalSymbols
    return displayValue > 0 ? displayValue > this.props.totalSymbols ? this.props.totalSymbols : displayValue : 1 / this.props.fractions;
  }

  calculateHoverPercentage(event) {
    const clientX = event.nativeEvent.type.indexOf("touch") > -1
      ? event.nativeEvent.type.indexOf("touchend") > -1
        ? event.changedTouches[0].clientX
        : event.touches[0].clientX
      : event.clientX;

    const targetRect = event.target.getBoundingClientRect();
    const delta = this.props.direction === 'rtl'
      ? targetRect.right - clientX
      : clientX - targetRect.left;

    // Returning 0 if the delta is negative solves the flickering issue
    return delta < 0 ? 0 : delta / targetRect.width;
  }

  render() {
    const {
      readonly,
      quiet,
      totalSymbols,
      value,
      placeholderValue,
      direction,
      emptySymbol,
      fullSymbol,
      placeholderSymbol,
      className,
      id,
      style,
      tabIndex
    } = this.props;
    const { displayValue, interacting } = this.state;
    const symbolNodes = [];
    const empty = [].concat(emptySymbol);
    const full = [].concat(fullSymbol);
    const placeholder = [].concat(placeholderSymbol);
    const shouldDisplayPlaceholder =
      placeholderValue !== 0 &&
      value === 0 &&
      !interacting;

    // The value that will be used as base for calculating how to render the symbols
    let renderedValue;
    if (shouldDisplayPlaceholder) {
      renderedValue = placeholderValue;
    } else {
      renderedValue = quiet ? value : displayValue;
    }

    // The amount of full symbols
    const fullSymbols = Math.floor(renderedValue);

    for (let i = 0; i < totalSymbols; i++) {
      let percent;
      // Calculate each symbol's fullness percentage
      if (i - fullSymbols < 0) {
        percent = 100;
      } else if (i - fullSymbols === 0) {
        percent = (renderedValue - i) * 100;
      } else {
        percent = 0;
      }

      symbolNodes.push(
        <Symbol
          key={i}
          index={i}
          readonly={readonly}
          inactiveIcon={empty[i % empty.length]}
          activeIcon={
            shouldDisplayPlaceholder ? placeholder[i % full.length] : full[i % full.length]
          }
          percent={percent}
          direction={direction}
          {...(!readonly && {
            onClick: this.symbolClick,
            onMouseMove: this.symbolMouseMove,
            onTouchMove: this.symbolMouseMove,
            onTouchEnd: this.symbolClick
          })}
        />
      );
    }

    return (
      <span
        id={id}
        style={{...style, display: 'inline-block', direction }}
        className={className}
        tabIndex={tabIndex}
        aria-label={this.props['aria-label']}
        {...(!readonly && {
          onMouseLeave: this.onMouseLeave
        })}
      >
        {symbolNodes}
      </span>
    );
  }
}

// Define propTypes only in development.
Rating.propTypes = typeof __DEV__ !== 'undefined' && __DEV__ && {
  totalSymbols: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired, // Always >= 0
  placeholderValue: PropTypes.number.isRequired,
  readonly: PropTypes.bool.isRequired,
  quiet: PropTypes.bool.isRequired,
  fractions: PropTypes.number.isRequired,
  direction: PropTypes.string.isRequired,
  emptySymbol: PropTypes.oneOfType([
    // Array of class names and/or style objects.
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.element])),
    // Class names.
    PropTypes.string,
    // Style objects.
    PropTypes.object,
    // React element
    PropTypes.element
  ]).isRequired,
  fullSymbol: PropTypes.oneOfType([
    // Array of class names and/or style objects.
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.element])),
    // Class names.
    PropTypes.string,
    // Style objects.
    PropTypes.object,
    // React element
    PropTypes.element
  ]).isRequired,
  placeholderSymbol: PropTypes.oneOfType([
    // Array of class names and/or style objects.
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.element])),
    // Class names.
    PropTypes.string,
    // Style objects.
    PropTypes.object,
    // React element
    PropTypes.element
  ]),
  onClick: PropTypes.func.isRequired,
  onHover: PropTypes.func.isRequired
};

export default Rating;
