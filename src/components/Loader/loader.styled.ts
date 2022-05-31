import styled, { keyframes } from 'styled-components';

const firstDot = keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`;

const secondDot = keyframes`
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
`;

const thirdDot = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
`;

export const LoaderWrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
`;

export const Dot = styled.div`
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: ${({ theme }) => theme.palette.iconSecondary};
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
  &:nth-child(1) {
    left: 8px;
    animation: ${firstDot} 0.6s infinite;
  }
  &:nth-child(2) {
    left: 8px;
    animation: ${secondDot} 0.6s infinite;
  }
  &:nth-child(3) {
    left: 32px;
    animation: ${secondDot} 0.6s infinite;
  }
  &:nth-child(4) {
    left: 56px;
    animation: ${thirdDot} 0.6s infinite;
  }
`;
