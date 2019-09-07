import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { useTheme } from '@@hooks';

const FONT = '14px Lato';

export const BarChart = ({ className, id, needs }) => {
  const theme = useTheme();
  const isInitialMount = useRef(true);

  const margin = { top: 10, right: 30, bottom: 90, left: 40 },
    width = 460 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

  const x = d3
    .scaleBand()
    .range([0, width])
    .domain(needs.map(d => d.label))
    .padding(0.2);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(needs.map(d => d.value))])
    .range([height, 0]);

  // color interpolation
  const colors = d3
    .scaleLinear()
    .domain([10, 40, 70, 100])
    .range(Object.values(theme.chart).reverse())
    .interpolate(d3.interpolateHcl);

  const drawGraph = () => {
    console.log('draw Graph');

    const svg = d3
      .select('#bar-chart')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .attr('id', 'main');

    // X axis

    svg
      .append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10, 5)rotate(-45)')
      .style('text-anchor', 'end')
      .style('font', FONT);

    // Add Y axis

    svg
      .append('g')
      .call(d3.axisLeft(y))
      .style('font', FONT);
  };

  useEffect(() => {
    /**
     * Draw Graph on initial render
     */
    if (isInitialMount.current) {
      isInitialMount.current = false;
      drawGraph();
    }
    console.log('update graph');
    console.log(needs);

    // Bars
    const bars = d3.select('#bar-chart #main').selectAll('rect')..data(needs, d => d.label);
    
    bars.enter()
      .append('rect')
      .attr('x', d => x(d.label))
      .attr('width', x.bandwidth())
      .attr('fill', d => colors(d.value))
      // no bar at the beginning thus:
      .attr('height', d => height - y(0)) // always equal to 0
      .attr('y', d => y(0))
      .transition()
      .duration(1200)
      .attr('y', d => y(d.value))
      .attr('height', d => height - y(d.value))
      .delay((d, i) => i * 100);
  }, [theme, needs]);

  useEffect(() => {
    // update
  }, []);

  return <svg {...(className && { className })} {...(id && { id })} />;
};
