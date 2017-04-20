'use strict';

import React from 'react';
import PropTypes from 'prop-types'
import Style from './utils/style';
import Symbol from './RatingSymbol';

class Rating extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      //Indicates the value that is displayed to the user in the form of symbols
      // always starts at the minimum possible value (step / fractions)
      // always ends at (stop - start)
      displayValue: this.props.establishedValue,
      //Indicates if the user is currently hovering over the rating element
      interacting: false,
      //Indicates if the rating element has been clicked even once
      dirty: false
    };
    this.onClick = this.onClick.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dirty: this.state.dirty || true,
      displayValue: nextProps.establishedValue
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.interacting) {
      if (prevState.displayValue !== this.state.displayValue) {
          //if our display value has changed and we have a user defined onChange function, call it
        if (this.props.onChange._name !== 'react_rating_noop') {
          this.props.onChange(this.state.displayValue);
        }
      }
    } else {
        //The user's mouse has left the rating element
      if (this.props.onChange._name !== 'react_rating_noop') {
        this.props.onChange(undefined);
      }
    }
  }

  onClick(event) {
    this.props.onClick(this.calculateDisplayValue(event), event);
  }

  onMouseEnter() {
    this.setState({
      interacting: this.props.readonly ? false : true
    });
  }

  onMouseMove(event) {
    const value = this.calculateDisplayValue(event);
    if (value !== this.state.displayValue) {
      this.setState({
        displayValue: value
      });
    }
  }

  onMouseLeave() {
    this.setState({
      displayValue: this.props.establishedValue,
      interacting: false
    });
  }

  mapPercentageToDisplayValue(percentage) {
    const symbolWidthPercentage = 1 / this.props.totalSymbols;
    const complete = Math.floor(percentage / symbolWidthPercentage);
    // Get the closest top fraction.
    const fraction = Math.ceil((percentage - (complete * symbolWidthPercentage)) % 1 * this.props.fractions * this.props.totalSymbols) / this.props.fractions;
    // Truncate decimal trying to avoid float precission issues.
    const precision = Math.pow(10, 3);
    const displayValue = (complete + (Math.floor(percentage) + Math.floor(fraction * precision) / precision)) * this.props.step;
    // ensure the returned value is greater than 0
    return (displayValue > 0) ? displayValue : (this.props.step / this.props.fractions);
  }

  calculateDisplayValue(event) {
    const percentage = this.calculateHoverPercentage(event);
    return this.mapPercentageToDisplayValue(percentage);
  }

  calculateHoverPercentage(event) {
    const delta = this.props.direction === 'rtl'
      ? this.container.getBoundingClientRect().right - event.clientX
      : event.clientX - this.container.getBoundingClientRect().left;

    return delta / this.container.offsetWidth;
  }

  render() {
    const {
      step,
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
    const fullSymbols = Math.floor(value / step);

    for (let i = 0; i < totalSymbols; i++) {
      let percent;
      // Calculate each symbol's fullness percentage
      if (i - fullSymbols < 0) {
        percent = 100;
      } else if (i - fullSymbols === 0) {
        percent = (value - (i * step)) / step * 100;
      } else {
        percent = 0;
      }

      symbolNodes.push(
        <Symbol
          key={i}
          readonly={readonly}
          background={empty[i % empty.length]}
          icon={full[i % full.length]}
          percent={percent}
          direction={direction} />
      );
    }

    return (
      <span
        style={{ display: 'inline-block', direction: direction }}
        ref={(ref) => { this.container = ref; }}
        onClick={!readonly && this.onClick}
        onMouseEnter={!readonly && this.onMouseEnter}
        onMouseMove={!readonly && this.onMouseMove}
        onMouseLeave={!readonly && this.onMouseLeave}
        >
        {symbolNodes}
      </span>
    );
  }
}

// Define propTypes only in development.
Rating.propTypes = typeof __DEV__ !== 'undefined' && __DEV__ && {
  step: PropTypes.number.isRequired,
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
  onChange: PropTypes.func.isRequired,
  totalSymbols: PropTypes.number.isRequired,
  establishedValue: PropTypes.number.isRequired
};

export default Rating;
