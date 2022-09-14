import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.section`
  padding: 10px 0;
  font-size: 16px;
`;
export const Crumb = styled(Link)`
  color: ${({ theme }) => theme.palette.Primary60};
  font-weight: 600;
  transition: 0.2s;
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.palette.Primary80};
  }
`;

export const Space = styled.span`
  margin: 0 7px;
  color: ${({ theme }) => theme.palette.Primary30};
  & span:before {
    font-size: 12px;
  }
`;

export const Last = styled.span`
  color: ${({ theme }) => theme.palette.Primary50};
  font-weight: 700;
`;
