import { Link } from "react-router-dom";
import styled, { css, createGlobalStyle } from "styled-components";
import {
  Body,
  Heading2,
  Heading3,
  Heading4,
  Heading5Large,
} from "./typography.styled";

export const Main = styled.main`
  height: 100%;
  background-color: ${({ theme }) => theme.palette.Grey5};
`;

export const borderRadius = "20px";

export type BlockType = {
  flex?: string;
  alignItems?: string;
  justifyContent?: string;
  margin?: string;
  padding?: string;
  position?: string;
  gap?: string;
  flexWrap?: string;
  responsive?: boolean;
  width?: string;
  height?: string;
  minWidth?: string;
  minHeight?: string;
  maxWidth?: string;
  maxHeight?: string;
  visible?: boolean;
};

type Button = {
  margin?: string;
  padding?: string;
  height?: string;
  width?: string;
};

const Btn = css<Button>`
  border: 0;
  border-radius: ${borderRadius};
  cursor: pointer;
  width: ${({ width }) => width || "unset"};
  height: ${({ height }) => height || "48px"};
  margin: ${({ margin }) => margin || ""};
  padding: ${({ padding }) => padding || ""};
  white-space: nowrap;
  transition: 0.2s;
  z-index: 0;
  position: relative;
  ${Body("medium", "large")};
  &:disabled {
    pointer-events: none;
  }
  &:focus-visible,
  &:focus {
    outline-color: transparent;
  }
`;

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background-color: #F8F8F8;
    height: 100vh;
    font-family: Roboto;
  }
  :focus-visible {
    outline-color: #e7b99b;
  }
`;

export const Div = styled.section<BlockType>`
  flex: ${({ flex }) => flex || 0};
  align-items: ${({ alignItems }) => alignItems || "stretch"};
  justify-content: ${({ justifyContent }) => justifyContent || "flex-start"};
  margin: ${({ margin }) => margin || 0};
  padding: ${({ padding }) => padding || 0};
  position: ${({ position }) => position || "static"};
  flex-wrap: ${({ flexWrap }) => flexWrap || "nowrap"};
  gap: ${({ gap }) => gap || 0};
  width: ${({ width }) => width || "unset"};
  height: ${({ height }) => height || "unset"};
  min-width: ${({ minWidth }) => minWidth || "unset"};
  min-height: ${({ minHeight }) => minHeight || "unset"};
  max-width: ${({ maxWidth }) => maxWidth || "unset"};
  max-height: ${({ maxHeight }) => maxHeight || "unset"};
  display: ${({ visible = true }) => (visible ? "flex" : "none")};
`;

export const Row = styled(Div)``;

export const Col = styled(Div)`
  flex-direction: column;
`;

export const Container = styled.article`
  padding: 20px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.palette.White};
  flex: 1;
  position: relative;
`;

export const Title = styled.h2`
  ${Heading2()}
  text-align: center;
  margin-top: 0;
  margin-bottom: 30px;
`;

export const ListTitle = styled.h2`
  color: ${({ theme }) => theme.palette.Grey90};
  margin: 10px 0;
  margin-top: 40px;
  padding: 0 20px;
  ${Heading5Large("medium")};
`;

export const InputText = styled.input`
  ${Heading4()};
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
  border-radius: ${borderRadius};
  background: ${({ theme }) => theme.palette.input};
  min-width: 280px;
  height: 40px;
  border: 0;
  padding-left: 20px;
  color: ${({ theme }) => theme.palette.black};
  &::placeholder {
    color: ${({ theme }) => theme.palette.placeholder};
    opacity: 1;
  }
`;

export const BtnPrimary = styled.button<Button>`
  ${Btn}
  color: ${({ theme }) => theme.palette.White};
  background-color: ${({ theme }) => theme.palette.Primary80};
  &:active {
    background-color: ${({ theme }) => theme.palette.Primary90};
  }
  &:disabled {
    background-color: ${({ theme }) => theme.palette.Primary60};
  }
  &:focus-visible {
    border: 1px solid ${({ theme }) => theme.palette.White};
    &:before {
      content: "";
      border-radius: 10px;
      position: absolute;
      z-index: -1;
      top: -2px;
      right: -2px;
      bottom: -2px;
      left: -2px;
      background-color: ${({ theme }) => theme.palette.Primary80};
    }
  }
  &:hover {
    box-shadow: 0px 3px 10px
      ${({ theme }) => theme.palette.BackgroundTransparency10};
  }
`;

export const BtnSecondary = styled.button<Button>`
  ${Btn}
  color: ${({ theme }) => theme.palette.Secondary90};
  background-color: ${({ theme }) => theme.palette.Secondary20};
  &:active {
    background-color: ${({ theme }) => theme.palette.Secondary30};
    color: ${({ theme }) => theme.palette.Secondary100};
  }
  &:disabled {
    background-color: ${({ theme }) => theme.palette.Secondary10};
    background-color: ${({ theme }) => theme.palette.Secondary60};
  }
  &:focus-visible {
    border: 1px solid ${({ theme }) => theme.palette.White};
    &:before {
      content: "";
      border-radius: 10px;
      position: absolute;
      z-index: -1;
      top: -2px;
      right: -2px;
      bottom: -2px;
      left: -2px;
      background-color: ${({ theme }) => theme.palette.Secondary60};
    }
  }
  &:hover {
    box-shadow: 0px 1px 5px
      ${({ theme }) => theme.palette.BackgroundTransparency10};
  }
`;

export const LinkPrimary = styled(Link)`
  ${Heading4()};
  ${Btn}
  color: ${({ theme }) => theme.palette.white};
  background: ${({ theme }) => theme.palette.btnPrimary};
  line-height: 40px;
`;

export const LinkSecondary = styled(Link)`
  ${Heading4()};
  ${Btn}
  background: ${({ theme }) => theme.palette.btnSecondary};
  line-height: 40px;
`;

export const CapitalCase = styled.span<{ isNoWrap?: boolean }>`
  white-space: ${({ isNoWrap = true }) => (isNoWrap ? "nowrap" : "wrap")};
  &::first-letter {
    text-transform: capitalize;
  }
`;

export const Tuple = styled(Row)`
  border-bottom: 1px solid ${({ theme }) => theme.palette.Grey10};
  justify-content: space-between;
  &:last-of-type {
    border-bottom: 0;
  }
`;

export const Key = styled.p<{ margin?: string }>`
  margin: ${({ margin }) => margin || "auto 0"};
  ${Body("regular", "large")}
  color: ${({ theme }) => theme.palette.Grey40};
`;

export const Value = styled.p`
  text-align: right;
  ${Body("medium", "large")}
  color: ${({ theme }) => theme.palette.Grey80}; ;
`;

export const WarnText = styled.p`
  ${Body("regular", "large")}
  color: #d13030;
`;

export const Label = styled.p`
  text-transform: capitalize;
`;

export const Content = styled(Col)`
  margin: 0 50px 50px 50px;
  width: ${({ width }) => width || "unset"};
  border-radius: 20px;
  background-color: ${({ theme }) => theme.palette.White};
  overflow: hidden;
`;

export const ScrollContent = styled(Col)`
  overflow-y: scroll;
  overflow-x: auto;
  margin-bottom: 20px;
  flex: 1;
`;

export const PanelContainer = styled.article`
  display: flex;
  height: 100%;
`;

export const ContentWrapper = styled(Row)`
  overflow: hidden;
  justify-content: center;
`;

export const Icon = styled.span`
  &:before {
    color: ${({ theme }) => theme.palette.Grey20};
    ${Body("regular", "large")};
    font-family: icomoon;
  }
`;

export const InfoBar = styled(Row)`
  background-color: ${({ theme }) => theme.palette.Secondary20};
  color: ${({ theme }) => theme.palette.Secondary100};
  align-items: center;
  padding: 10px 20px;
  gap: 10px;
  ${Body("regular", "medium")}
  border-radius: 20px;
  & span::before {
    font-size: 30px;
  }
`;

export const WarnBar = styled(Row)`
  background-color: ${({ theme }) => theme.palette.Yellow20};
  color: ${({ theme }) => theme.palette.Yellow100};
  align-items: center;
  padding: 10px 20px;
  gap: 10px;
  ${Body("regular", "medium")}
  border-radius: 20px;
  & span::before {
    font-size: 30px;
  }
`;

export const ListContainer = styled(Col)`
  position: relative;
  background-color: ${({ theme }) => theme.palette.White};
  border-radius: 20px;
  max-width: 1000px;
  width: 100%;
  flex: 1;
  &.hidden {
    display: none;
  }
`;

export const ListWrapper = styled(Col)`
  width: 100%;
  flex: 1;
  overflow: hidden;
`;

export const ContentContainer = styled(Row)`
  margin: 0 50px 50px 50px;
  gap: 20px;
  flex: 1;
  justify-content: center;
`;
