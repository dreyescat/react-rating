'use strict';

import React from 'react';
import PropTypes from 'prop-types'
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
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.symbolMouseMove = this.symbolMouseMove.bind(this);
    this.symbolClick = this.symbolClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dirty: ((this.props.establishedValue !== nextProps.establishedValue) && !this.state.dirty) ? true : this.state.dirty,
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
      interacting: this.props.readonly ? false : true
    });
  }

  onMouseLeave() {
    this.setState({
      displayValue: this.props.establishedValue,
      interacting: false
    });
  }

  calculateDisplayValue(symbolIndex, event) {
    const precision = Math.pow(10, 3);
    const percentage = this.calculateHoverPercentage(event);
    // Get the closest top fraction.
    const fraction = Math.ceil((percentage) % 1 * this.props.fractions) / this.props.fractions;
    // Truncate decimal trying to avoid float precission issues.
    const displayValue = (symbolIndex + (Math.floor(percentage) + Math.floor(fraction * precision) / precision)) * this.props.step;
    // ensure the returned value is greater than 0
    return (displayValue > 0) ? displayValue : (this.props.step / this.props.fractions);
  }

  calculateHoverPercentage(event) {
    const delta = this.props.direction === 'rtl'
      ? event.target.getBoundingClientRect().right - event.clientX
      : event.clientX - event.target.getBoundingClientRect().left;

    // Returnin 0 if the delta is negative solves the flickering issue
    return delta < 0 ? 0 : delta / event.target.offsetWidth;
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
          index={i}
          readonly={readonly}
          background={empty[i % empty.length]}
          icon={full[i % full.length]}
          percent={percent}
          onClick={!readonly && this.symbolClick}
          onMouseMove={!readonly && this.symbolMouseMove}
          direction={direction} />
      );
    }

    return (
      <span
        style={{ display: 'inline-block', direction: direction }}
        ref={(ref) => { this.container = ref; }}
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
