import React from 'react';
import PropTypes from 'prop-types';

const Tooltip = ({ hovered, position, year }) => {
  if (!hovered && !position && !year) return null;
  return (
    <div
      className="tooltip"
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
    >
      <span className="tooltip__title">
        {hovered.properties.name}
      </span>
      <span className="tooltip__imr">
        {
           Object.keys(hovered.imr).length && hovered.imr[year] !== 'NA'
             ? `Infant mortality rate (${year}): ${hovered.imr[year]}\u2030`
             : 'Data not available'
       }
      </span>
    </div>
  );
};

Tooltip.propTypes = {
  hovered: PropTypes.shape({
    type: PropTypes.string,
    id: PropTypes.string,
    properties: PropTypes.shape({
      name: PropTypes.string,
    }),
    geometry: PropTypes.shape({
      type: PropTypes.string,
      coordinates: PropTypes.array,
    }),
    imr: PropTypes.object,
  }),
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  year: PropTypes.number,
};

export default Tooltip;
