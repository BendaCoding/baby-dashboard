import styled from 'styled-components';

export const AnimatedRect = styled.rect`
  transition: height 250ms ${({ theme }) => theme.transitions.easeInOutQuad};
`;

export const Text = styled.text`
  fill: ${({ theme }) => theme.dimmed};
  font: '14px Lato';
`;
