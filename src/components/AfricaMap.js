import React, { useState } from 'react';
import { geoMercator, geoPath } from 'd3-geo';
import PropTypes from 'prop-types';
import Country from './Country';
import Tooltip from './Tooltip';

const margin = {
  top: 5,
  right: 0,
  bottom: 40,
  left: 0,
};

const width = 400 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

const projection = geoMercator()
  .scale(310)
  .translate([100, 230]);

const pathGenerator = geoPath().projection(projection);

const AfricaMap = ({ data, colorScale, selectedYear }) => {
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState(null);

  return (
    <div className="africaMap">
      <svg
        width={width + margin.left + margin.right}
        height={height + margin.top + margin.top}
      >
        <g>
          {data.features.map((country) => (
            <Country
              key={country.id}
              d={pathGenerator(country)}
              fill={country.imr[selectedYear] === 'NA' ? '#d3d3d3' : colorScale(country.imr[selectedYear])}
              onMouseEnter={(event) => {
                setTooltipPosition({ x: event.pageX, y: event.pageY });
                setHoveredCountry(country);
              }}
              onMouseLeave={() => {
                setTooltipPosition(null);
                setHoveredCountry(null);
              }}
            />
          ))}
        </g>
      </svg>
      {tooltipPosition ? (
        <Tooltip
          hovered={hoveredCountry}
          position={tooltipPosition}
          year={selectedYear}
        />
      ) : null}
    </div>
  );
};

AfricaMap.propTypes = {
  data: PropTypes.object,
  colorScale: PropTypes.func,
  selectedYear: PropTypes.number,
};

export default AfricaMap;
