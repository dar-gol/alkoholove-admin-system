import { Link } from "react-router-dom";
import styled from "styled-components";
import { Heading3 } from "../../styles/typography.styled";

export const Block = styled(Link)`
  ${Heading3()}
  padding: 20px 0;
  margin: 0 30px;
  text-align: center;
  border-bottom: 2px solid ${({ theme }) => theme.palette.primary};
`;

export const t = 1;
