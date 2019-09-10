import React from 'react';
import styled from 'styled-components';
import { ATTRIBUTE_LABELS } from '../../../constants';
import { Flex } from 'rebass';

const Wrap = styled(Flex)`
  cursor: pointer;

  &:hover {
  }
`;

const Circle = styled.circle.attrs(({ theme, attr }) => ({
  fill: theme.attributes[attr],
  cx: 6,
  cy: 6,
  r: 6
}))``;

const Span = styled.span`
  transition: 250ms color ${({ theme }) => theme.transitions.easeInOutQuad};
  ${({ active }) => !active && `color: #999`};
`;

export const LegendItem = ({ attr, onClick, active }) => (
  <Wrap mb={3} onClick={onClick}>
    <svg style={{ marginTop: 4, marginRight: 5 }} width={12} height={12}>
      <Circle attr={attr} />
    </svg>
    <Span active={active}>{ATTRIBUTE_LABELS[attr]}</Span>
  </Wrap>
);
