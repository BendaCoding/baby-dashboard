import React, { useRef, useContext, useEffect } from 'react';
import * as d3 from 'd3';
import { useTheme } from '../../../hooks';
import { GameSettingsContext } from '../../../utils';
import { MOMMY_THRESHOLDS, INTERVALS } from '../../../constants';
import * as S from './styled';

const FONT = '14px Lato';

export const BarChart = ({ width: outerWidth, height: outerHeight, className, id, needs }) => {
  const theme = useTheme();
  const isInitialRender = useRef(true);
  const [gameSettings] = useContext(GameSettingsContext);
  const threshold = MOMMY_THRESHOLDS[gameSettings.difficulty];
  const interval = INTERVALS[gameSettings.difficulty];

  const margin = { top: 20, right: 30, bottom: 90, left: 70 },
    width = outerWidth - margin.left - margin.right,
    height = outerHeight - margin.top - margin.bottom;

  const xScale = d3
    .scaleBand()
    .range([0, width])
    .domain(needs.map(d => d.label))
    .padding(0.2);

  const yScale = d3
    .scaleLinear()
    .domain([0, 1000])
    .range([height, 0]);

  const yAxis = d3
    .axisLeft(yScale)
    .tickValues([threshold, 1000])
    .tickFormat((d, i) => (d === 1000 ? 'Happy' : 'Moody'));

  // color interpolation
  const colors = d3
    .scaleLinear()
    .domain([threshold, 500, 800, 1000])
    .range(Object.values(theme.chart).reverse())
    .interpolate(d3.interpolateHcl);

  useEffect(() => {
    /**
     * Draw Graph on initial render
     */
    const drawGraph = () => {
      const svg = d3
        .select('#bar-chart')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .select('#main');

      // Add X axis
      svg
        .append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(xScale))
        .attr('class', 'x-axis')
        .selectAll('text')
        .attr('transform', 'translate(-10, 5)rotate(-45)')
        .style('text-anchor', 'end')
        .style('font', FONT);

      // Add Y axis
      svg
        .append('g')
        .call(yAxis)
        .style('font', FONT)
        .attr('class', 'y-axis');
    };

    if (isInitialRender.current) {
      drawGraph();
      isInitialRender.current = false;
    }
    const svg = d3.select('#bar-chart #main');

    svg
      .select('.y-axis')
      .transition()
      .call(yAxis);

    // Bars
    const bars = d3
      .select('#bar-chart #main')
      .selectAll('rect.bar')
      .data(needs, d => d.attr);

    // Update existing elems
    bars
      .transition()
      .ease(d => d)
      .duration(interval)
      .attr('y', d => yScale(d.value))
      .attr('fill', d => colors(d.value))
      .attr('height', d => height - yScale(d.value))
      .delay((d, i) => i * 100);

    // Enter for new elems
    bars
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => xScale(d.label))
      .attr('width', xScale.bandwidth())
      .attr('fill', d => colors(d.value))
      // no bar at the beginning thus:
      .attr('height', d => height - yScale(0)) // always equal to 0
      .attr('y', d => yScale(0))
      .transition()
      .duration(1200)
      .attr('y', d => yScale(d.value))
      .attr('height', d => height - yScale(d.value))
      .delay((d, i) => i * 100);
  }, [theme, needs, threshold, xScale, yScale, colors, height, margin, interval, width, yAxis]);

  return (
    <svg width={outerWidth} height={outerHeight} {...(className && { className })} {...(id && { id })}>
      <defs>
        <pattern id="stripes" width="8" height="8" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
          <rect width="1" height="8" transform="translate(0,0)" fill="#ffffff44"></rect>
        </pattern>
      </defs>
      <g transform={`translate(${margin.left}, ${margin.top})`} id="main">
        <S.Text y={-5} x={10}>
          Comfort Zone
        </S.Text>
        <S.AnimatedRect
          width={width - 15}
          height={yScale(MOMMY_THRESHOLDS[gameSettings.difficulty])}
          x={10}
          y={1}
          fill="url(#stripes)"
          stroke="#ffffff44"
          stroke-width="1"
          z-index={2}
        />
      </g>
    </svg>
  );
};
