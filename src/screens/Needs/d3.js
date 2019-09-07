import * as d3 from 'd3';
import { theme } from '@@theme';

const FONT = '14px Lato';

export const drawNeeds = ({ needs }) => {
  // set the dimensions and margins of the graph
  const margin = { top: 10, right: 30, bottom: 90, left: 40 },
    width = 460 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

  // remove
  // d3.selectAll('#bar-chart > *').remove();

  // append the svg object to the body of the page
  const svg = d3
    .select('#bar-chart')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  // color interpolation
  const colors = d3
    .scaleLinear()
    .domain([10, 40, 70, 100])
    .range(Object.values(theme.chart).reverse())
    .interpolate(d3.interpolateHcl);

  // X axis
  const x = d3
    .scaleBand()
    .range([0, width])
    .domain(needs.map(d => d.label))
    .padding(0.2);

  svg
    .append('g')
    .attr('transform', 'translate(0,' + height + ')')
    .call(d3.axisBottom(x))
    .selectAll('text')
    .attr('transform', 'translate(-10, 5)rotate(-45)')
    .style('text-anchor', 'end')
    .style('font', FONT);

  // Add Y axis
  const y = d3
    .scaleLinear()
    .domain([0, d3.max(needs.map(d => d.value))])
    .range([height, 0]);

  svg
    .append('g')
    .call(d3.axisLeft(y))
    .style('font', FONT);

  // Bars
  svg
    .selectAll()
    .data(needs)
    .enter()
    .append('rect')
    .attr('x', d => x(d.label))
    .attr('width', x.bandwidth())
    .attr('fill', d => colors(d.value))
    // no bar at the beginning thus:
    // .attr('height', d => height - y(0)) // always equal to 0
    .attr('y', d => y(0));

  // Animation
  svg
    .selectAll('rect')
    .transition()
    .duration(1200)
    .attr('y', d => y(d.value))
    .attr('height', d => height - y(d.value))
    .delay((d, i) => i * 100);
};

export const updateNeeds = ({ needs }) => {
  const svg = d3.select('#bar-chart > svg');
};
