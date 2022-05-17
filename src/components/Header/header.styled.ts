import styled from 'styled-components';
import { Heading2 } from '../../styles/typography.styled';

export const Container = styled.header`
  height: 80px;
  display: flex;
  align-items: center;
  padding: ${({ theme }) => `0 ${theme.spacings.s6}px`};
  background-color: ${({ theme }) => theme.palette.headerBg};
`;

export const Title = styled.h1`
  ${Heading2()}
  color: ${({ theme }) => theme.palette.white};
`;
