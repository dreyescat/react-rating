import React, { PropTypes } from 'react';
import Style from './utils/style';
import Rating from './Rating';
import noop from './utils/noop';

class RatingContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: props.initialRating
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.translateDisplayValueToValue = this.translateDisplayValueToValue.bind(this);
    this.tranlateValueToDisplayValue = this.tranlateValueToDisplayValue.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.initialRating
    });
  }

  componentDidUpdate(prevProps, prevState) {
    // If we have a new value trigger onChange callback
    if (this.state.value !== prevState.value) {
      this.props.onChange(this.state.value);
    }
  }

  handleClick(value, e) {
    const newValue = this.translateDisplayValueToValue(value);
    // Avoid calling setState if not necessary. Micro optimisation.
    if (this.state.value !== newValue) {
      this.setState({
        value: newValue
      });
    }
  }

  handleHover(displayValue) {
    const value = displayValue === undefined
      ? displayValue
      : this.translateDisplayValueToValue(displayValue);
    this.props.onHover(value);
  }

  translateDisplayValueToValue(displayValue) {
    const translatedValue = displayValue * this.props.step + this.props.start;
    // minimum value cannot be equal to start, since it's exclusive
    return translatedValue === this.props.start
      ? translatedValue + 1 / this.props.fractions
      : translatedValue;
  }

  tranlateValueToDisplayValue(value) {
    if (value === undefined) {
      return;
    }
    return (value - this.props.start) / this.props.step;
  }

  render() {
    const {
      step,
      emptySymbol,
      fullSymbol,
      placeholderSymbol,
      readonly,
      quiet,
      fractions,
      direction,
      start,
      stop
    } = this.props;

    function calculateTotalSymbols(start, stop, step) {
      return Math.floor((stop - start) / step);
    }

    return (
      <Rating
        emptySymbol={emptySymbol}
        fullSymbol={fullSymbol}
        placeholderSymbol={placeholderSymbol}
        readonly={readonly}
        quiet={quiet}
        fractions={fractions}
        direction={direction}
        onClick={this.handleClick}
        onHover={this.handleHover}
        totalSymbols={calculateTotalSymbols(start, stop, step)}
        establishedValue={this.tranlateValueToDisplayValue(this.state.value)}
        placeholderValue={this.tranlateValueToDisplayValue(this.props.placeholderRating)}
      />
    );
  }
}

RatingContainer.defaultProps = {
  start: 0,
  stop: 5,
  step: 1,
  readonly: false,
  quiet: false,
  fractions: 1,
  direction: 'ltr',
  onChange: noop,
  onHover: noop,
  emptySymbol: Style.empty,
  fullSymbol: Style.full,
  placeholderSymbol: Style.placeholder
};

// Define propTypes only in development.
RatingContainer.propTypes = typeof __DEV__ !== 'undefined' && __DEV__ && {
  start: PropTypes.number,
  stop: PropTypes.number,
  step: PropTypes.number,
  initialRating: PropTypes.number,
  placeholderRating: PropTypes.number,
  readonly: PropTypes.bool,
  quiet: PropTypes.bool,
  fractions: PropTypes.number,
  direction: PropTypes.string,
  emptySymbol: PropTypes.oneOfType([
    // Array of class names and/or style objects.
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.element])),
    // Class names.
    PropTypes.string,
    // Style objects.
    PropTypes.object
  ]),
  fullSymbol: PropTypes.oneOfType([
    // Array of class names and/or style objects.
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.element])),
    // Class names.
    PropTypes.string,
    // Style objects.
    PropTypes.object
  ]),
  placeholderSymbol: PropTypes.oneOfType([
    // Array of class names and/or style objects.
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.element])),
    // Class names.
    PropTypes.string,
    // Style objects.
    PropTypes.object
  ]),
  onHover: PropTypes.func,
  onChange: PropTypes.func
};

export default RatingContainer;
