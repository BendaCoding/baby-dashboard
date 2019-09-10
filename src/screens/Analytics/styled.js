import styled from 'styled-components';

export const Relative = styled.div`
  position: relative;
`;

export const Warning = styled.h2`
  position: absolute;
  top: 170px;
  left: 320px;
  text-align: center;
  color: ${({ theme }) => theme.dimmed};
`;
