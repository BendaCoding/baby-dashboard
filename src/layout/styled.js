import styled from 'styled-components';
import baby from '@@images/baby.jpg';

export const Container = styled.div`
  perspective: 1500px;
  perspective-origin: 0% 50%;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
`;

export const Pusher = styled.div`
  position: relative;
  left: 0;
  z-index: 99;
  height: 100%;
  transition: transform 0.5s;
  transform-origin: 100% 50%;
  transform-style: preserve-3d;

  ${({ isOpen }) =>
    isOpen &&
    `
    transform: rotateY(-10deg);
  `};

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.2);
    content: '';
    opacity: 0;
    transition: opacity 0.5s, width 0.1s 0.5s, height 0.1s 0.5s;

    ${({ isOpen }) =>
      isOpen &&
      `
      opacity: 1;
      width: 100%;
      height: 100%;
      `};
  }
`;

export const Content = styled.div`
  background: #282c34;
  min-height: 100vh;
`;

export const Sidebar = styled.div`
  opacity: 1;
  transform: translate3d(-100%, 0, 0);
  transform-style: preserve-3d;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 100;
  visibility: hidden;
  width: 250px;
  height: 100%;
  background: #48a770;
  transition: all 0.5s;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${({ isOpen }) =>
    isOpen &&
    `
    visibility: visible;
    transition: transform 0.5s;
    transform: translate3d(0, 0, 0);
  `};
`;

export const BabyAvatar = styled.img.attrs({ src: baby })`
  max-width: 180px;
  border-radius: 50%;
  margin-right: 20px;
`;

export const Headline = styled.h1`
  margin: 0;
`;
