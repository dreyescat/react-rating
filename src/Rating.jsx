'use strict';

import React from 'react';
import PropTypes from 'prop-types'
import Style from './style';
import Symbol from './PercentageSymbol';

// Returns the index of the rate in the range (start, stop, step).
// Returns undefined index if the rate is outside the range.
// NOTE: A range.step of 0 produces an empty range and consequently returns an
// undefined index.
const indexOf = (range, rate) => {
  // Check the rate is in the proper range [start..stop] according to
  // the start, stop and step properties in props.
  const step = range.step;
  const start = step > 0 ? range.start : range.stop;
  const stop = step > 0 ? range.stop : range.start;
  if (step && start <= rate && rate <= stop) {
    // The index corresponds to the number of steps of size props.step
    // that fits between rate and start.
    // This index does not need to be a whole number because we can have
    // fractional symbols, and consequently fractional/float indexes.
    return (rate - range.start) / step;
  }
};

class Rating extends React.Component {
  constructor(props) {
    super(props);
    const index = props.initialRate !== undefined ?
      props.initialRate : props.placeholderRate;
    this.state = {
      index: indexOf(props, index),
      indexOver: undefined,
      // Default direction is left to right
      direction: 'ltr'
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  componentDidMount() {
    this.setState({
      // detect the computed direction style for the mounted component
      direction: window.getComputedStyle(this.refs.container, null).getPropertyValue("direction")
    });
  }

  componentWillReceiveProps(nextProps) {
    const rate = nextProps.initialRate !== undefined ?
      nextProps.initialRate : nextProps.placeholderRate;
    this.setState({
      index: indexOf(nextProps, rate),
      selected: nextProps.initialRate !== undefined
    });
  }

  handleClick(i, event) {
    const index = i + this._fractionalIndex(event);
    this.props.onClick(this._indexToRate(index), event);
    if (this.state.index !== index) {
      this.props.onChange(this._indexToRate(index));
      this.setState({
        indexOver: undefined,
        index: index,
        selected: true
      });
    }
  }

  handleMouseLeave() {
    this.props.onRate();
    this.setState({
      indexOver: undefined
    });
  }

  handleMouseMove(i, event) {
    const index = i + this._fractionalIndex(event);
    if (this.state.indexOver !== index) {
      this.props.onRate(this._indexToRate(index));
      this.setState({
        indexOver: index
      });
    }
  }

  // Calculate the rate of an index according the the start and step.
  _indexToRate(index) {
    return this.props.start + Math.floor(index) * this.props.step +
      this.props.step * this._roundToFraction(index % 1);
  }

  // Calculate the corresponding index for a rate according to the provided
  // props or this.props.
  _rateToIndex(rate) {
    return indexOf(this.props, rate);
  }

  _roundToFraction(index) {
    // Get the closest top fraction.
    const fraction = Math.ceil(index % 1 * this.props.fractions) / this.props.fractions;
    // Truncate decimal trying to avoid float precission issues.
    const precision = Math.pow(10, this.props.scale);
    return Math.floor(index) + Math.floor(fraction * precision) / precision;
  }

  _fractionalIndex(event) {
    const x = this.state.direction === 'rtl' ?
      event.currentTarget.getBoundingClientRect().right - event.clientX :
      event.clientX - event.currentTarget.getBoundingClientRect().left;
    return this._roundToFraction(x / event.currentTarget.offsetWidth);
  }

  render() {
    const {
      start,
      stop,
      step,
      initialRate,
      placeholderRate,
      readonly,
      quiet,
      fractions,
      scale,
      onChange,
      onClick,
      onRate,
      ...other
    } = this.props;
    const symbolNodes = [];
    const empty = [].concat(this.props.empty);
    const placeholder = [].concat(this.props.placeholder);
    const full = [].concat(this.props.full);
    // The symbol with the mouse over prevails over the selected one,
    // provided that we are not in quiet mode.
    const index = !quiet && this.state.indexOver !== undefined ?
      this.state.indexOver : this.state.index;
    // The index of the last full symbol or NaN if index is undefined.
    const lastFullIndex = Math.floor(index);
    // Render the number of whole symbols.

    const icon = !this.state.selected &&
      initialRate === undefined &&
      placeholderRate !== undefined &&
      (quiet || this.state.indexOver === undefined) ?
      placeholder : full;

    for (let i = 0; i < Math.floor(this._rateToIndex(stop)); i++) {
      // Return the percentage of the decimal part of the last full index,
      // 100 percent for those below the last full index or 0 percent for those
      // indexes NaN or above the last full index.
      const percent = i - lastFullIndex === 0 ? index % 1 * 100 :
        i - lastFullIndex < 0 ? 100 : 0;

      symbolNodes.push(<Symbol
          key={i}
          background={empty[i % empty.length]}
          icon={icon[i % icon.length]}
          percent={percent}
          onClick={!readonly && this.handleClick.bind(this, i)}
          onMouseMove={!readonly && this.handleMouseMove.bind(this, i)}
          direction={this.state.direction}
          />);
    }

    return (
      <span ref="container" onMouseLeave={!readonly && this.handleMouseLeave} {...other}>
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
  onChange: function (rate) {},
  onClick: function (rate) {},
  onRate: function (rate) {}
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
    PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.element
    ])),
    // Class names.
    PropTypes.string,
    // Style objects.
    PropTypes.object]),
  placeholder: PropTypes.oneOfType([
    // Array of class names and/or style objects.
    PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.element
    ])),
    // Class names.
    PropTypes.string,
    // Style objects.
    PropTypes.object]),
  full: PropTypes.oneOfType([
    // Array of class names and/or style objects.
    PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.element
    ])),
    // Class names.
    PropTypes.string,
    // Style objects.
    PropTypes.object]),
  readonly: PropTypes.bool,
  quiet: PropTypes.bool,
  fractions: PropTypes.number,
  scale: PropTypes.number,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onRate: PropTypes.func
};

module.exports = Rating;
