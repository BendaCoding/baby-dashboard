import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import * as S from './styled';
import { Bars } from './Bars';

const FONT = '14px Lato';

export const BarChart = ({ width, height, data, margins, ...props }) => {
  const ref = useRef(null);
  const cache = useRef(data);

  const [pt, pr, pb, pl] = margins;
  const innerWidth = width - pl - pr;
  const innerHeight = height - pt - pb;

  // X Axis
  const x = d3
    .scaleBand()
    .range([0, innerWidth])
    .domain(data.map(d => d.label))
    .padding(0.1);

  // Y Axis
  const y = d3
    .scaleLinear()
    .domain([0, 100])
    .range([innerHeight, 0]);

  return (
    <S.SVG width={width} height={height}>
      <g ref={ref} transform={`translate(${margins[3]}, ${margins[0]})`}>
        <g
          className="axis axis--x"
          transform={`translate(0, ${innerHeight})`}
          ref={node =>
            d3
              .select(node)
              .call(d3.axisBottom(x))
              .selectAll('text')
              .attr('transform', 'translate(-10, 5)rotate(-45)')
              .style('text-anchor', 'end')
              .style('font', FONT)
          }
        />
        <g className="axis axis--y">
          <g
            ref={node =>
              d3
                .select(node)
                .call(d3.axisLeft(y))
                .style('font', FONT)
            }
          />
          <S.Text transform="rotate(-90)" y="6" dy="0.71em" textAnchor="end">
            Fulfilled
          </S.Text>
        </g>
        <Bars {...{ x, y, data, innerWidth, innerHeight, margins }} />
      </g>
    </S.SVG>
  );
};

BarChart.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  margins: PropTypes.array
};

BarChart.defaultProps = {
  width: 460,
  height: 450,
  margins: [10, 30, 90, 40]
};
