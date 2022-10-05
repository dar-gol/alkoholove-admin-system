import styled from "styled-components";
import { BtnPrimary } from "../../styles/global.styled";
import { Body } from "../../styles/typography.styled";

export const CurrentPage = styled(BtnPrimary)`
  background-color: ${({ theme }) => theme.palette.Primary80};
  color: ${({ theme }) => theme.palette.White};
`;
export const PageInfo = styled.span`
  position: absolute;
  top: -10px;
  left: 0;
  ${Body("regular", "small")}
  color: ${({ theme }) => theme.palette.Grey40}
`;
