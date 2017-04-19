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
    this.calculateTotalSymbols = this.calculateTotalSymbols.bind(this);
  }

  handleClick(value, e) {
    const newValue = this.translateDisplayValueToValue(value);
    this.props.onClick(newValue, e);
    this.setState({
      value: newValue
    });
  }

  handleChange(displayValue) {
    this.props.onChange(this.translateDisplayValueToValue(displayValue));
  }

  translateDisplayValueToValue(displayValue) {
    return displayValue + this.props.start;
  }

  tranlateValueToDisplayValue(value) {
    return value - this.props.start;
  }

  calculateTotalSymbols(start, stop, step) {
    return Math.floor((stop - start) / step);
  }

  render() {
    const {
      step,
      empty,
      full,
      readonly,
      quiet,
      fractions,
      direction,
      start,
      stop
    } = this.props;

    return (
      <Rating
        step={step}
        empty={empty}
        full={full}
        readonly={readonly}
        quiet={quiet}
        fractions={fractions}
        direction={direction}
        onClick={this.handleClick}
        onChange={this.handleChange}
        totalSymbols={this.calculateTotalSymbols(start, stop, step)}
        establishedValue={this.tranlateValueToDisplayValue(this.state.value)}
      />
    );
  }
}

RatingContainer.defaultProps = {
  direction: 'ltr',
  start: 0,
  stop: 5,
  step: 1,
  empty: Style.empty,
  full: Style.full,
  readonly: false,
  quiet: false,
  fractions: 1,
  onChange: noop,
  onClick: noop
};

// Define propTypes only in development.
RatingContainer.propTypes = typeof __DEV__ !== 'undefined' && __DEV__ && {
  direction: PropTypes.string,
  start: PropTypes.number,
  stop: PropTypes.number,
  step: PropTypes.number,
  initialValue: PropTypes.number,
  empty: PropTypes.oneOfType([
    // Array of class names and/or style objects.
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.element])),
    // Class names.
    PropTypes.string,
    // Style objects.
    PropTypes.object
  ]),
  full: PropTypes.oneOfType([
    // Array of class names and/or style objects.
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.element])),
    // Class names.
    PropTypes.string,
    // Style objects.
    PropTypes.object
  ]),
  readonly: PropTypes.bool,
  quiet: PropTypes.bool,
  fractions: PropTypes.number,
  onChange: PropTypes.func,
  onClick: PropTypes.func
};

export default RatingContainer;
