import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

export const BarChart = ({ width, height, data, padding, ...props }) => {
  const ref = useRef(null);
  const cache = useRef(data);

  // const createPie = d3
  //   .pie()
  //   .value(d => d.value)
  //   .sort(null);

  // const createArc = d3
  //   .arc()
  //   .innerRadius(props.innerRadius)
  //   .outerRadius(props.outerRadius);

  // color interpolation
  const colors = d3
    .scaleLinear()
    .domain([10, 40, 70, 100])
    .range(Object.values(theme.chart).reverse())
    .interpolate(d3.interpolateHcl);
  const format = d3.format('.2f');

  useEffect(() => {
    const data = createPie(data);
    const prevData = createPie(cache.current);
    const group = d3.select(ref.current);
    const groupWithData = group.selectAll('g.arc').data(data);

    groupWithData.exit().remove();

    const groupWithUpdate = groupWithData
      .enter()
      .append('g')
      .attr('class', 'arc');

    const path = groupWithUpdate
      .append('path')
      .merge(groupWithData.select('path.arc'));

    const arcTween = (d, i) => {
      const interpolator = d3.interpolate(prevData[i], d);

      return t => createArc(interpolator(t));
    };

    path
      .attr('class', 'arc')
      .attr('fill', (d, i) => colors(i))
      .transition()
      .attrTween('d', arcTween);

    const text = groupWithUpdate
      .append('text')
      .merge(groupWithData.select('text'));

    text
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .style('fill', 'white')
      .style('font-size', 10)
      .transition()
      .attr('transform', d => `translate(${createArc.centroid(d)})`)
      .tween('text', (d, i, nodes) => {
        const interpolator = d3.interpolate(prevData[i], d);

        return t => d3.select(nodes[i]).text(format(interpolator(t).value));
      });

    cache.current = data;
  }, [data]);

  return (
    <svg width={width} height={height}>
      <g
        ref={ref}
        transform={`translate(${props.outerRadius} ${props.outerRadius})`}
      />
    </svg>
  );
};

BarChart.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  padding: PropTypes.array
};

BarChart.propTypes = {
  padding: [10, 30, 90, 40]
};
