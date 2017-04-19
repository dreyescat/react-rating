/* eslint-disable */
'use strict';

import React from 'react';
import PropTypes from 'prop-types'
import Style from './utils/style';
import Symbol from './PercentageSymbol';

// Returns the index of the rate in the range (start, stop, step).
// Returns undefined index if the rate is outside the range.
// NOTE: A range.step of 0 produces an empty range and consequently returns an
// undefined index.
const indexOf = (props, value) => {
  const {step, start, stop} = props;

  if (step && (start <= value) && (value <= stop)) {
    // The index corresponds to the number of steps of size props.step
    // that fits between rate and start.
    // This index does not need to be a whole number because we can have
    // fractional symbols, and consequently fractional/float indexes.
    return (value - start) / step;
  }
  return 0;
};

class RatingContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.initialRate || props.placeholderRate
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.value !== this.state.value) {
      this.props.onChange(this.state.value);
    }
  }

  handleClick(value, e) {
    this.props.onClick(this.state.value, e);
    this.setState({value});
  }

  render() {
    const {
      start,
      stop,
      step,
      empty,
      full,
      placeholder,
      readonly,
      quiet,
      fractions,
      onRate
    } = this.props;

    function calculateTotalSteps(start, stop, step) {
        return Math.floor((stop-start) / step);
    }

    function calulateBaseUnit() {
      return 1 / step;
    }

    function calulateHoverUnit() {
      return 1 / fractions;
    }

    function mapValueToSteps(value, steps) {
      return value / step;
    }

    return (
      <Rating
         realValue={this.state.value}
         start={start}
         stop={stop}
         step={step}
         empty={empty}
         full={full}
         placeholder={placeholder}
         readonly={readonly}
         quiet={quiet}
         fractions={fractions}
         onClick={this.handleClick}
         onRate={onRate} />
    );
  }
}

RatingContainer.defaultProps = {
  onChange: () => {},
  onClick: () => {}
}

class Rating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayValue: this.props.realValue,
      symbols: this.calculateTotalSymbols(this.props.start, this.props.stop, this.props.step),
      // Default direction is left to right
      direction: window.getComputedStyle(document.body, null).getPropertyValue("direction")
    };
    this.onClick = this.onClick.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    // const rate = nextProps.initialRate !== undefined
    //   ? nextProps.initialRate
    //   : nextProps.placeholderRate;
    // this.setState({
    //   index: indexOf(nextProps, rate),
    //   selected: nextProps.initialRate !== undefined
    // });
  }

  calculateTotalSymbols(start, stop, step) {
      return Math.floor((stop-start) / step);
  }

  onClick(event) {
    // const index = this._fractionalIndex(event);
      // this.props.onChange(this._indexToRate(index));
      // this.props.onClick(index * this.props.step, event);
      this.props.onClick(this.state.displayValue, event);
      // this.setState({value: undefined, index: index, selected: true});
  }

  handleMouseLeave() {
    this.props.onRate();
  }

  handleMouseEnter() {
    this.props.onRate();
  }

  onMouseLeave() {
    this.setState({displayValue: this.props.realValue});
  }

  onMouseMove(event) {
    const index = this._fractionalIndex(event);
    this.setState({displayValue: index * this.props.step});
  }

  // Calculate the rate of an index according the the start and step.
  _indexToRate(index) {
    return this.props.start + Math.floor(index) * this.props.step + this.props.step * this._roundToFraction(index % 1);
  }

  // Calculate the corresponding index for a rate according to the provided
  // props or this.props.
  // _rateToIndex(rate) {
  //   return indexOf(this.props, rate);
  // }

  _roundToFraction(percentage) {
    const symbolBasePercentage = 1 / this.state.symbols;
    const complete = Math.floor(percentage / symbolBasePercentage);

    // Get the closest top fraction.
    const fraction = Math.ceil((percentage - (complete * symbolBasePercentage)) % 1 * this.props.fractions * this.state.symbols) / this.props.fractions;
    // Truncate decimal trying to avoid float precission issues.
    const precision = Math.pow(10, this.props.scale);
    return complete + (Math.floor(percentage) + Math.floor(fraction * precision) / precision);
  }

  _fractionalIndex(event) {
    const x = this.state.direction === 'rtl'
      ? this.container.getBoundingClientRect().right - event.clientX
      : event.clientX - this.container.getBoundingClientRect().left;
    return this._roundToFraction(x / this.container.offsetWidth);
  }

  render() {
    const {
      start,
      stop,
      step,
      readonly,
      quiet,
      fractions,
      scale,
      onClick,
      onRate
    } = this.props;
    const symbolNodes = [];
    const empty = [].concat(this.props.empty);
    const placeholder = [].concat(this.props.placeholder);
    const full = [].concat(this.props.full);
    const value = !quiet ? this.state.displayValue : this.props.realValue;
    // The index of the last full symbol or NaN if index is undefined.
    const fullSymbols = Math.floor(value / step);
    // Render the number of whole symbols.

    const icon = full;
    // !this.state.selected && initialRate === undefined && placeholderRate !== undefined && (quiet || this.state.value === undefined)
    //   ? placeholder
    //   : full;

    for (let i = 0; i < this.state.symbols; i++) {
      let percent;

      if (i - fullSymbols < 0) {
        percent = 100;
      } else if (i - fullSymbols === 0) {
        percent = (value - (i * step)) / step * 100;
      } else {
        percent = 0;
      }

      symbolNodes.push(
        <Symbol
          readonly={readonly}
          key={i}
          background={empty[i % empty.length]}
          icon={icon[i % icon.length]}
          percent={percent}
          onMouseLeave={!readonly && this.handleMouseLeave}
          onMouseEnter={!readonly && this.handleMouseEnter}
          direction={this.state.direction} />
      );
    }

    return (
      <span
        ref={(ref) => { this.container = ref; }}
        onClick={!readonly && this.onClick}
        onMouseMove={!readonly && this.onMouseMove}
        onMouseLeave={!readonly && this.onMouseLeave}
        >
        {symbolNodes}
      </span>
    );
  }
}

Rating.defaultProps = {
  start: 0,
  stop: 5,
  step: 1,
  empty: Style.empty,
  placeholder: Style.placeholder,
  full: Style.full,
  fractions: 1,
  scale: 3,
  onChange: function(rate) {},
  onClick: function(rate) {},
  onRate: function(rate) {}
}

// Define propTypes only in development.
Rating.propTypes = typeof __DEV__ !== 'undefined' && __DEV__ && {
  start: PropTypes.number,
  stop: PropTypes.number,
  step: PropTypes.number,
  initialRate: PropTypes.number,
  placeholderRate: PropTypes.number,
  empty: PropTypes.oneOfType([
    // Array of class names and/or style objects.
    React.PropTypes.arrayOf(React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object, React.PropTypes.element])),
    // Class names.
    PropTypes.string,
    // Style objects.
    React.PropTypes.object
  ]),
  placeholder: React.PropTypes.oneOfType([
    // Array of class names and/or style objects.
    React.PropTypes.arrayOf(React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object, React.PropTypes.element])),
    // Class names.
    PropTypes.string,
    // Style objects.
    React.PropTypes.object
  ]),
  full: React.PropTypes.oneOfType([
    // Array of class names and/or style objects.
    React.PropTypes.arrayOf(React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object, React.PropTypes.element])),
    // Class names.
    PropTypes.string,
    // Style objects.
    React.PropTypes.object
  ]),
  readonly: React.PropTypes.bool,
  quiet: React.PropTypes.bool,
  fractions: React.PropTypes.number,
  scale: React.PropTypes.number,
  onChange: React.PropTypes.func,
  onClick: React.PropTypes.func,
  onRate: React.PropTypes.func
};

export default RatingContainer;
