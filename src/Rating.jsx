import React from 'react';
import PropTypes from 'prop-types';
import Symbol from './RatingSymbol';

class Rating extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // Indicates the value that is displayed to the user in the form of symbols
      displayValue: this.props.establishedValue,
      // Indicates if the user is currently hovering over the rating element
      interacting: false,
      // Indicates if the rating element has been clicked even once
      dirty: false
    };
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.symbolMouseMove = this.symbolMouseMove.bind(this);
    this.symbolClick = this.symbolClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dirty: this.props.establishedValue !== nextProps.establishedValue && !this.state.dirty
        ? true
        : this.state.dirty,
      displayValue: nextProps.establishedValue
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.displayValue !== this.state.displayValue) {
      this.props.onHover(this.state.displayValue);
    }
  }

  symbolClick(symbolIndex, event) {
    this.props.onClick(this.state.displayValue, event);
  }

  symbolMouseMove(symbolIndex, event) {
    const value = this.calculateDisplayValue(symbolIndex, event);
    if (value !== this.state.displayValue) {
      this.setState({
        displayValue: value
      });
    }
  }

  onMouseEnter() {
    this.setState({
      interacting: !this.props.readonly
    });
  }

  onMouseLeave() {
    this.setState({
      displayValue: this.props.establishedValue,
      interacting: false
    });
  }

  calculateDisplayValue(symbolIndex, event) {
    const percentage = this.calculateHoverPercentage(event);
    // Get the closest top fraction.
    const fraction = Math.ceil(percentage % 1 * this.props.fractions) / this.props.fractions;
    // Truncate decimal trying to avoid float precission issues.
    const precision = Math.pow(10, 3);
    const displayValue =
      symbolIndex + (Math.floor(percentage) + Math.floor(fraction * precision) / precision);
    // ensure the returned value is greater than 0
    return displayValue > 0 ? displayValue : 1 / this.props.fractions;
  }

  calculateHoverPercentage(event) {
    const delta = this.props.direction === 'rtl'
      ? event.target.getBoundingClientRect().right - event.clientX
      : event.clientX - event.target.getBoundingClientRect().left;

    // Returning 0 if the delta is negative solves the flickering issue
    return delta < 0 ? 0 : delta / event.target.offsetWidth;
  }

  render() {
    const {
      readonly,
      quiet,
      totalSymbols,
      establishedValue,
      direction,
      emptySymbol,
      fullSymbol
    } = this.props;
    const { displayValue } = this.state;
    const symbolNodes = [];
    const empty = [].concat(emptySymbol);
    const full = [].concat(fullSymbol);
    // The value that will be used as base for calculating how to render the symbols
    const value = quiet ? establishedValue : displayValue;
    // The amount of full symbols
    const fullSymbols = Math.floor(value);

    for (let i = 0; i < totalSymbols; i++) {
      let percent;
      // Calculate each symbol's fullness percentage
      if (i - fullSymbols < 0) {
        percent = 100;
      } else if (i - fullSymbols === 0) {
        percent = (value - i) * 100;
      } else {
        percent = 0;
      }

      symbolNodes.push(
        <Symbol
          key={i}
          index={i}
          readonly={readonly}
          background={empty[i % empty.length]}
          icon={full[i % full.length]}
          percent={percent}
          onClick={!readonly && this.symbolClick}
          onMouseMove={!readonly && this.symbolMouseMove}
          direction={direction}
        />
      );
    }

    return (
      <span
        style={{ display: 'inline-block', direction }}
        onMouseEnter={!readonly && this.onMouseEnter}
        onMouseLeave={!readonly && this.onMouseLeave}
      >
        {symbolNodes}
      </span>
    );
  }
}

// Define propTypes only in development.
Rating.propTypes = typeof __DEV__ !== 'undefined' && __DEV__ && {
  emptySymbol: PropTypes.oneOfType([
    // Array of class names and/or style objects.
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.element])),
    // Class names.
    PropTypes.string,
    // Style objects.
    PropTypes.object
  ]).isRequired,
  fullSymbol: PropTypes.oneOfType([
    // Array of class names and/or style objects.
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.element])),
    // Class names.
    PropTypes.string,
    // Style objects.
    PropTypes.object
  ]).isRequired,
  readonly: PropTypes.bool.isRequired,
  quiet: PropTypes.bool.isRequired,
  fractions: PropTypes.number.isRequired,
  direction: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onHover: PropTypes.func.isRequired,
  totalSymbols: PropTypes.number.isRequired,
  establishedValue: PropTypes.number.isRequired
};

export default Rating;
