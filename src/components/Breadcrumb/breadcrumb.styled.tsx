import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.section`
  margin-left: 10px;
  padding: 10px 0;
  font-size: 16px;
`;
export const Crumb = styled(Link)`
  color: ${({ theme }) => theme.palette.primary};
  font-weight: 600;
  opacity: 0.7;
  transition: 0.2s;
  text-decoration: none;
  &:hover {
    opacity: 0.9;
  }
`;

export const Space = styled.span`
  opacity: 0.4;
  color: ${({ theme }) => theme.palette.primary};
  font-weight: 900;
`;

export const Last = styled.span`
  opacity: 0.6;
  color: ${({ theme }) => theme.palette.primary};
  font-weight: 700;
`;
