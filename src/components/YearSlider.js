import React from 'react';
import PropTypes from 'prop-types';

const YearSlider = ({
  minValue,
  maxValue,
  onSetYear,
  selectedYear,
}) => {
  const inputWidth = 400;

  return (
    <div className="slider">
      <div className="slider__label" style={{ center: inputWidth / 2 }}>
        <span className="slider__label__value">{selectedYear}</span>
      </div>

      <input
        type="range"
        value={selectedYear}
        min={minValue}
        max={maxValue}
        onChange={(event) => onSetYear(Number(event.target.value))}
      />
      <div className="slider__minmaxValues">
        <span>{minValue}</span>
        <span>{maxValue}</span>
      </div>
    </div>
  );
};

YearSlider.propTypes = {
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  onSetYear: PropTypes.func,
  selectedYear: PropTypes.number,
};

export default YearSlider;
