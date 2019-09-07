import React, { useEffect } from 'react';
import { useTheme } from '@@hooks/';
import * as d3 from 'd3';

export const Bars = ({ x, y, data, innerHeight }) => {
  const theme = useTheme();

  const colors = d3
    .scaleLinear()
    .domain([10, 40, 70, 100])
    .range(Object.values(theme.chart).reverse())
    .interpolate(d3.interpolateHcl);

  useEffect(() => {
    d3.selectAll('rect')
      .transition()
      .duration(1200)
      .style('height', 10);

    // cache.current = data;
  }, [data]);

  const bars = data.map(({ label, value }) => (
    <rect
      key={label}
      x={x(label)}
      y={y(value)}
      height={innerHeight - y(value)}
      width={x.bandwidth()}
      fill={colors(value)}
      style={{ transition: `all 0.4s ${theme.transitions.easeInOutQuad}` }}
    />
  ));

  return <g>{bars}</g>;
};
