import styled from "styled-components";
import { Col } from "../../styles/global.styled";

export const Property = styled(Col)`
  padding: 20px;
  border-radius: 20px;
  position: relative;
  border: 2px solid
    ${({ theme }) =>
      theme.isHighContrast ? theme.palette.Grey70 : theme.palette.Grey5};
`;
export const BtnDelete = styled.button`
  font-weight: 900;
  font-size: 20px;
  position: absolute;
  top: 20px;
  right: -15px;
  height: 30px;
  width: 30px;
  border: 0;
  border-radius: 100%;
  background-color: #d75252;
  color: white;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  display: ${({ hide }: { hide?: boolean }) => (hide ? "none" : "block")};
`;

export const BtnEdit = styled.button`
  font-weight: 900;
  font-size: 20px;
  position: absolute;
  top: 60px;
  right: -15px;
  height: 30px;
  width: 30px;
  border: 0;
  border-radius: 100%;
  background-color: #7492b9;
  color: white;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  display: ${({ hide }: { hide?: boolean }) => (hide ? "none" : "block")};
`;
