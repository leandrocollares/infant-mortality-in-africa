import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

const Axis = ({
  orientation,
  scale,
  colorScale,
  xTransform,
  yTransform,
  className,
}) => {
  const axisRef = useRef(null);
  const tickSize = 12;

  useEffect(() => {
    d3.select(axisRef.current)
      .call(d3[`axis${orientation}`](scale)
        .tickSize(tickSize)
        .tickValues(colorScale.domain()));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <g
      ref={axisRef}
      transform={`translate(${xTransform}, ${yTransform})`}
      className={className}
    />
  );
};

Axis.propTypes = {
  orientation: PropTypes.string,
  scale: PropTypes.func,
  colorScale: PropTypes.func,
  xTransform: PropTypes.number,
  yTransform: PropTypes.number,
  className: PropTypes.string,
};

export default Axis;
