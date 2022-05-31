import styled from 'styled-components';
import { Heading1 } from '../../styles/typography.styled';

export const Test1 = styled.section``;
export const Test2 = styled.section``;

export const Container = styled.section`
  width: 100vw;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h1`
  ${Heading1()}
  color: ${({ theme }) => theme.palette.black};
  text-align: center;
  margin: 0;
`;
