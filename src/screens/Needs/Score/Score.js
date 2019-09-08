import React from 'react';
import { Flex } from 'rebass';
import styled from 'styled-components';

export const H2 = styled.h2`
  min-height: 30px;
  margin: 0;
`;

const numberWithSeparators = x =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

export const Score = ({ score }) => {
  return (
    <Flex mb={4} px={3}>
      <H2>Score: {numberWithSeparators(score)}</H2>
    </Flex>
  );
};
