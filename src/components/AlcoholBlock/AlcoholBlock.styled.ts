import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Row } from '../../styles/global.styled';
import { Heading3, Heading4, Label } from '../../styles/typography.styled';

export const Alcoholblock = styled(Row)`
  border-radius: 10px;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
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

export const WarnText = styled.p`
  ${Heading4()}
  color: #d13030;
`;

export const Tuple = styled.section`
  display: flex;
  border-bottom: 2px solid ${({ theme }) => theme.palette.grey};
  justify-content: space-between;
  &:last-of-type {
    border-bottom: 0;
  }
`;

export const Key = styled.p`
  color: ${({ theme }) => theme.palette.grey};
`;

export const Value = styled.p`
  color: black;
  font-weight: 600;
`;
