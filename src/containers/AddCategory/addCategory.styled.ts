import styled from 'styled-components';
import { Heading2 } from '../../styles/typography.styled';

export const Container = styled.article`
  padding: 30px;
  margin: 20px auto;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
  max-width: 678px;
`;

export const Title = styled.h2`
  ${Heading2()}
  text-align: center;
  margin-top: 0;
  margin-bottom: 30px;
`;
