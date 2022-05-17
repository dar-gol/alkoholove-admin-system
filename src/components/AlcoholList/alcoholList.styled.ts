import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Row } from '../../styles/global.styled';
import { Heading3 } from '../../styles/typography.styled';

export const Alcoholist = styled(Row)`
  border-radius: 10px;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
`;

export const More = styled(Link)`
  display: flex;
  flex-grow: 1;
  text-decoration: none;
`;

export const Title = styled.h2`
  ${Heading3()}
  margin-left: 10px;
`;
