/* eslint-disable */
import React, { PropTypes } from 'react';
import Style from './utils/style';
import Rating from './Rating';
import noop from './utils/noop';

class RatingContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.initialValue || props.start
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.translateDisplayValueToValue = this.translateDisplayValueToValue.bind(this);
    this.tranlateValueToDisplayValue = this.tranlateValueToDisplayValue.bind(this);
  }

  handleClick(value, e) {
    const newValue = this.translateDisplayValueToValue(value);
    this.props.onClick(newValue, e);
    this.setState({
      value: newValue
    });
  }

  handleChange(displayValue) {
    const value = displayValue === undefined? displayValue : this.translateDisplayValueToValue(displayValue);
    this.props.onChange(value);
  }

  translateDisplayValueToValue(displayValue) {
    const translatedValue = displayValue + this.props.start;
    // minimum value cannot be equal to start, since it's exclusive
    return translatedValue === this.props.start ? this.props.step / this.props.fractions : translatedValue;
  }

  tranlateValueToDisplayValue(value) {
    return value - this.props.start;
  }

  render() {
    const {
      step,
      emptySymbol,
      fullSymbol,
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
        step={step}
        emptySymbol={emptySymbol}
        fullSymbol={fullSymbol}
        readonly={readonly}
        quiet={quiet}
        fractions={fractions}
        direction={direction}
        onClick={this.handleClick}
        onChange={this.handleChange}
        totalSymbols={calculateTotalSymbols(start, stop, step)}
        establishedValue={this.tranlateValueToDisplayValue(this.state.value)}
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
  onClick: noop,
  emptySymbol: Style.empty,
  fullSymbol: Style.full
};

// Define propTypes only in development.
RatingContainer.propTypes = typeof __DEV__ !== 'undefined' && __DEV__ && {
  start: PropTypes.number,
  stop: PropTypes.number,
  step: PropTypes.number,
  initialValue: PropTypes.number,
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
  onChange: PropTypes.func,
  onClick: PropTypes.func
};

export default RatingContainer;
