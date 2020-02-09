import React from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';
import Axis from './Axis';

const margin = {
  top: 5,
  right: 0,
  bottom: 30,
  left: 0,
};
const width = 400 - margin.left - margin.right;
const height = 50 - margin.top - margin.bottom;

const Legend = ({ colorScale }) => {
  const xScaleMin = d3.min(colorScale.domain());
  const xScaleMax = d3.max(colorScale.domain());
  const xScale = d3.scaleLinear()
    .domain([xScaleMin, xScaleMax])
    .rangeRound([15, 385]);

  const colorBands = colorScale.range().map((color) => {
    const d = colorScale.invertExtent(color);

    if (d[0] == null) d[0] = xScale.domain()[0];
    if (d[1] == null) d[1] = xScale.domain()[1];

    return d;
  });

  return (
    <div className="legend">
      <svg
        width={width + margin.left + margin.right}
        height={height + margin.top + margin.top}
      >
        {colorBands.map((band) => (
          <rect
            key={band}
            x={xScale(band[0])}
            width={xScale(band[1]) - xScale(band[0])}
            height={10}
            fill={colorScale(band[0])}
          />
        ))}
        <Axis
          orientation="Bottom"
          scale={xScale}
          colorScale={colorScale}
          xTransform={0}
          yTransform={0}
          className="legend__axis"
        />
      </svg>
    </div>
  );
};

Legend.propTypes = {
  colorScale: PropTypes.func,
};

export default Legend;
