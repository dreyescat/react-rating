'use strict';

import React from 'react';
import PropTypes from 'prop-types'
import Style from './utils/style';
import Symbol from './RatingSymbol';

class Rating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayValue: this.props.establishedValue,
      interacting: false,
      dirty: false
    };
    this.onClick = this.onClick.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  onClick(event) {
    this.setState({
      dirty: this.state.dirty || true,
      displayValue: this.calculateDisplayValue(event)
    }, () => {
      this.props.onClick(this.state.displayValue, event);
    });
  }

  onMouseEnter() {
    this.setState({
      interacting: true
    });
  }

  onMouseMove(event) {
    if (!this.props.quiet) {
      this.setState({
        displayValue: this.calculateDisplayValue(event)
      }, () => {
        this.props.onChange(this.state.displayValue);
      });
    } else {
      if (this.props.onChange._name !== 'react_rating_noop') {
        this.props.onChange(this.calculateDisplayValue(event));
      }
    }
  }

  onMouseLeave() {
    this.setState({
      displayValue: this.props.establishedValue,
      interacting: false
    });
    if (this.props.onChange._name !== 'react_rating_noop') {
      this.props.onChange(undefined);
    }
  }

  mapPercentageToDisplayValue(percentage) {
    const symbolWidthPercentage = 1 / this.props.totalSymbols;
    const complete = Math.floor(percentage / symbolWidthPercentage);

    // Get the closest top fraction.
    const fraction = Math.ceil((percentage - (complete * symbolWidthPercentage)) % 1 * this.props.fractions * this.props.totalSymbols) / this.props.fractions;
    // Truncate decimal trying to avoid float precission issues.
    const scale = 3;
    const precision = Math.pow(10, scale);
    const displayValue = (complete + (Math.floor(percentage) + Math.floor(fraction * precision) / precision)) * this.props.step;
    return (displayValue >= 0) ? displayValue : 0;
  }

  calculateDisplayValue(event) {
    const percentage = this.calculateHoverPercentage(event);
    return this.mapPercentageToDisplayValue(percentage);
  }

  calculateHoverPercentage(event) {
    const delta = this.state.direction === 'rtl'
      ? this.container.getBoundingClientRect().right - event.clientX
      : event.clientX - this.container.getBoundingClientRect().left;

    return delta / this.container.offsetWidth;
  }

  render() {
    const {
      step,
      readonly,
      quiet
    } = this.props;
    const symbolNodes = [];
    const empty = [].concat(this.props.empty);
    const full = [].concat(this.props.full);
    const value = !quiet ? this.state.displayValue : this.props.establishedValue;

    // The index of the last full symbol or NaN if index is undefined.
    const fullSymbols = Math.floor(value / step);
    // Render the number of whole symbols.

    const icon = full;

    for (let i = 0; i < this.props.totalSymbols; i++) {
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
          key={i}
          readonly={readonly}
          background={empty[i % empty.length]}
          icon={icon[i % icon.length]}
          percent={percent}
          direction={this.state.direction} />
      );
    }

    return (
      <span
        style={{ display: 'inline-block', direction: this.state.direction }}
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
  empty: PropTypes.oneOfType([
    // Array of class names and/or style objects.
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.element])),
    // Class names.
    PropTypes.string,
    // Style objects.
    PropTypes.object
  ]).isRequired,
  full: PropTypes.oneOfType([
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
