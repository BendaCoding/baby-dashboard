import React, { useEffect, useMemo } from 'react';
import * as d3 from 'd3';
import { ATTRIBUTES, ATTRIBUTE_LABELS } from '../../../constants';
import { useTheme } from '../../../hooks';

const FONT = '14px Lato';

export const LineChart = ({
  data,
  width: outerWidth = 700,
  height: outerHeight = 560,
  id = 'line-chart',
  className = '',
  threshold,
  interval,
  visibleAttributes
}) => {
  const margin = { top: 20, right: 20, bottom: 90, left: 80 };
  const width = outerWidth - margin.left - margin.right;
  const height = outerHeight - margin.top - margin.bottom;

  const theme = useTheme();
  const colors = useMemo(() => Object.values(theme.attributes), [theme]);
  const arrVisibleAttributes = Object.values(visibleAttributes);

  useEffect(() => {
    const dataCount = data[ATTRIBUTES.HUNGRY].length;
    const dataAsArray = Object.values(data);
    const timespan = dataCount * interval;

    d3.selectAll(`#${id} > *:not(defs)`).remove();

    const getTickFormat = (d, tickIndex) => {
      const seconds = (timespan * tickIndex) / 10 / 1000;

      if (timespan > 120000) {
        return `${parseFloat((seconds / 60).toFixed(1))}m`;
      }

      return `${parseFloat(seconds.toFixed(1))}s`;
    };

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

    /**
     * X Axis
     */
    const xScale = d3
      .scaleLinear()
      .domain([0, dataCount - 1])
      .range([0, width]);

    const xTicks = xScale.ticks().filter(tick => Number.isInteger(tick));

    const xAxis = main
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(
        d3
          .axisBottom(xScale)
          .tickValues(xTicks)
          .tickFormat(getTickFormat)
      )
      .style('font', FONT);

    /**
     * Y Axis
     */
    const yScale = d3
      .scaleLinear()
      .domain([0, 1000])
      .range([height, 0]);
    const yAxis = main
      .append('g')
      .call(
        d3
          .axisLeft(yScale)
          .tickValues([threshold, 1000])
          .tickFormat((d, i) => (d === 1000 ? 'Happy' : 'Moody'))
      )
      .style('font', FONT);

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
      .attr('stroke', (d, index) => colors[index])
      .attr('stroke-width', 1.5)
      .attr('stroke-linecap', 'round')
      .attr('class', 'line')
      .style('opacity', (d, index) => (Object.values(arrVisibleAttributes)[index] ? 1 : 0))
      .attr(
        'd',
        d3
          .line()
          .curve(d3.curveMonotoneX)
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
