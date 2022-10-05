import styled from "styled-components";
import { Body, Heading5Large } from "../../styles/typography.styled";

export const Details = styled.i`
  ${Body("regular", "medium")}
  color: ${({ theme }) => theme.palette.Red80};
  text-align: justify;
  display: block;
  height: 70px;
  overflow-y: scroll;
  margin-bottom: 20px;
`;

export const DetailTitle = styled.p`
  ${Body("regular", "large")}
  margin-bottom: 20px;
  color: ${({ theme }) => theme.palette.Grey70};
`;

export const Text = styled.p`
  ${Heading5Large("medium")}
  font-size: 14px;
  text-align: center;
  color: ${({ theme }) => theme.palette.Grey80};
`;
