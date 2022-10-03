import styled from "styled-components";
import { Heading2Large } from "../../styles/typography.styled";

export const PropertyBtn = styled.button`
  width: 100%;
  height: 100px;
  background-color: ${({ theme }) => theme.palette.Grey5};
  color: ${({ theme }) => theme.palette.Grey20};
  ${Heading2Large("bold")}
  border-radius: 20px;
  border: none;
  cursor: pointer;
`;

export const test2 = "";
