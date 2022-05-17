import { css } from 'styled-components';

export const Heading1 = () => css`
  font-size: ${({ theme }) => theme.fontSize.s7}px;
  font-family: Roboto;
  color: ${({ theme }) => theme.palette.title};
  font-weight: ${({ theme }) => theme.weights.bold};
  letter-spacing: 0.3px;
`;

export const Heading2 = () => css`
  font-size: ${({ theme }) => theme.fontSize.s5}px;
  font-family: Roboto;
  color: ${({ theme }) => theme.palette.heading};
  font-weight: ${({ theme }) => theme.weights.bold};
  letter-spacing: 0.3px;
`;

export const Heading3 = () => css`
  font-size: ${({ theme }) => theme.fontSize.s4}px;
  font-family: Roboto;
  color: ${({ theme }) => theme.palette.heading};
  font-weight: ${({ theme }) => theme.weights.bold};
  letter-spacing: 0.3px;
`;

export const Heading4 = () => css`
  font-size: ${({ theme }) => theme.fontSize.s3}px;
  font-family: Roboto;
  color: ${({ theme }) => theme.palette.heading};
  font-weight: ${({ theme }) => theme.weights.bold};
  letter-spacing: 0.3px;
`;

export const Common = () => css`
  font-size: ${({ theme }) => theme.fontSize.s3}px;
  font-family: Roboto;
  color: ${({ theme }) => theme.palette.content};
  font-weight: ${({ theme }) => theme.weights.regular};
  letter-spacing: 0.3px;
`;

export const CommonSmall = () => css`
  font-size: ${({ theme }) => theme.fontSize.s2}px;
  font-family: Roboto;
  color: ${({ theme }) => theme.palette.content};
  font-weight: ${({ theme }) => theme.weights.regular};
  letter-spacing: 0.3px;
`;

export const Label = () => css`
  font-size: ${({ theme }) => theme.fontSize.s2}px;
  font-family: Roboto;
  color: ${({ theme }) => theme.palette.heading};
  font-weight: ${({ theme }) => theme.weights.medium};
  letter-spacing: 0.3px;
`;
