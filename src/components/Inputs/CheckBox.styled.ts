import styled from "styled-components";
import { Body, Heading5Large } from "../../styles/typography.styled";
import { Row } from "../../styles/global.styled";

export const Container = styled(Row)`
  padding: 0 10px;
  gap: 10px;
  align-items: center;
  border-radius: 20px;
  background-color: ${({ color }) => color || "transparent"};
  cursor: pointer;
  border: 2px solid
    ${({ theme, title }) =>
      theme.isHighContrast && title ? theme.palette.Grey50 : "transparent"};
`;

export const CheckBoxWrapper = styled(Row)`
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  min-width: 30px;
  min-height: 30px;
  background-color: ${({ theme }) => theme.palette.White};
  border: 2px solid ${({ theme }) => theme.palette.Grey10};
  transition: background-color 0.3s, border 0.3s;
  &.active {
    background-color: ${({ theme }) => theme.palette.Secondary30};
    border: 2px solid ${({ theme }) => theme.palette.Secondary60};
  }
`;

export const CheckBoxContainer = styled(Row)`
  background-color: ${({ theme }) => theme.palette.White};
  border: 2px solid
    ${({ theme }) =>
      theme.isHighContrast ? theme.palette.Grey50 : "transparent"};
  width: 74px;
  height: 40px;
  flex: 1;
  border-radius: 20px;
  position: relative;
  cursor: pointer;
  &.active > div {
    left: 50%;
  }
`;

export const Indicator = styled.div`
  height: 34px;
  width: 34px;
  position: absolute;
  top: 50%;
  left: 3px;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  background: ${({ color, theme }) => color || theme.palette.Grey30};
  transition: 0.2s;
  & span:before {
    color: ${({ theme }) => theme.palette.White};
  }
`;

export const IconWrapper = styled(Row)`
  width: 50%;
  height: 100%;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const Icon = styled.span<{ visible?: boolean }>`
  display: ${({ visible = true }) => (visible ? "block" : "none")};
  &:before {
    color: ${({ theme }) => theme.palette.Grey20};
    ${Heading5Large("bold")}
    font-family: icomoon;
  }
`;

export const Text = styled.p`
  white-space: nowrap;
  color: ${({ theme }) => theme.palette.Grey70};
  ${Body("regular", "medium")};
`;
