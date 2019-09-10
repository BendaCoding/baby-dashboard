import React, { useEffect, useMemo } from 'react';
import * as d3 from 'd3';
import { ATTRIBUTES, ATTRIBUTE_LABELS } from '../../../constants';
import { useTheme } from '../../../hooks';

export const LineChart = ({
  data,
  width: outerWidth = 700,
  height: outerHeight = 560,
  id = 'line-chart',
  className = '',
  threshold,
  visibleAttributes
}) => {
  const margin = { top: 20, right: 20, bottom: 90, left: 60 };
  const width = outerWidth - margin.left - margin.right;
  const height = outerHeight - margin.top - margin.bottom;

  const theme = useTheme();
  const colors = useMemo(() => Object.values(theme.attributes), [theme]);

  useEffect(() => {
    const dataCount = data[ATTRIBUTES.HUNGRY].length;
    const dataAsArray = Object.values(data);

    d3.selectAll(`#${id} > *:not(defs)`).remove();

    const svg = d3
      .select(`#${id}`)
      .attr('width', outerWidth)
      .attr('height', outerHeight);

    const main = svg
      .append('g')
      .attr('width', width)
      .attr('height', height)
      .attr('className', 'main')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const xScale = d3
      .scaleLinear()
      .domain([0, dataCount])
      .range([0, width]);
    const xAxis = main
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));

    const yScale = d3
      .scaleLinear()
      .domain([0, 1000])
      .range([height, 0]);
    const yAxis = main.append('g').call(d3.axisLeft(yScale));

    /**
     * Color Palette
     */
    const color = d3
      .scaleOrdinal()
      .domain([0, 4])
      .range(colors);

    /**
     * Draw Mommy box
     */
    main
      .append('rect')
      .attr('stroke', '#777777')
      .attr('stroke-with', 1)
      .attr('x', 0)
      .attr('y', yScale(threshold))
      .attr('width', width)
      .attr('fill', 'url(#stripes)')
      .attr('height', yScale(1000 - threshold));

    /**
     * Add Lines
     */
    const lines = main.selectAll('.line').data(dataAsArray);

    lines
      .enter()
      .append('path')
      .attr('fill', 'none')
      .attr('stroke', (d, index) => color(index))
      .attr('stroke-width', (d, index) => (Object.values(visibleAttributes)[index] ? 1.5 : 0))
      .attr('stroke-linecap', 'round')
      .attr('class', 'line')
      .attr(
        'd',
        d3
          .line()
          .curve(d3.curveCatmullRom)
          .x((d, index) => xScale(index))
          .y(d => yScale(d))
      );
  });

  return (
    <svg id={id} className={className}>
      <defs>
        <pattern id="stripes" width="8" height="8" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
          <rect width="1" height="8" transform="translate(0,0)" fill="#ffffff44"></rect>
        </pattern>
      </defs>
    </svg>
  );
};
