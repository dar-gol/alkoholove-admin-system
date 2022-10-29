import { Link } from "react-router-dom";
import styled, { css, createGlobalStyle } from "styled-components";
import {
  Body,
  Caption,
  Footer,
  Heading1Large,
  Heading1Small,
  Heading2,
  Heading2Large,
  Heading2Small,
  Heading3,
  Heading3Large,
  Heading3Small,
  Heading4,
  Heading4Large,
  Heading4Small,
  Heading5Large,
  Heading5Small,
  Heading6Large,
  Heading6Small,
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
  /* * {
    box-sizing: border-box;
  } */
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
  border: 2px solid
    ${({ theme }) =>
      theme.isHighContrast ? theme.palette.Secondary100 : "transparent"};
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

export const BtnGhost = styled.button<Button>`
  ${Btn}
  color: ${({ theme }) => theme.palette.Grey60};
  background-color: ${({ theme }) => theme.palette.Grey5};
  &:active {
    background-color: ${({ theme }) => theme.palette.Grey10};
    color: ${({ theme }) => theme.palette.Grey80};
  }
  &:disabled {
    color: ${({ theme }) => theme.palette.Grey40};
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
      background-color: ${({ theme }) => theme.palette.White};
    }
  }
  &:hover {
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
  color: ${({ theme }) => theme.palette.Grey80};
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
  border: 2px solid
    ${({ theme }) =>
      theme.isHighContrast ? theme.palette.Grey70 : "transparent"};
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

export const Icon = styled.span<{ color?: string; visible?: boolean }>`
  display: ${({ visible = true }) => (visible ? "block" : "none")};
  &:before {
    color: ${({ theme, color }) => color || theme.palette.Grey20};
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
  & span {
    border-radius: 20px;
    background-color: ${({ theme }) =>
      theme.isHighContrast ? theme.palette.Secondary100 : "transparent"};
  }
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
  & span {
    width: 30px;
    height: 30px;
    position: relative;
  }
  & span::before {
    display: ${({ theme }) => (theme.isHighContrast ? "none" : "block")};
    font-size: 30px;
  }
  & span::after {
    content: "";
    display: ${({ theme }) => (theme.isHighContrast ? "block" : "none")};
    height: 0;
    width: 0;
    position: absolute;
    left: 0;
    top: 0;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-bottom: 30px solid ${({ theme }) => theme.palette.Yellow100};
  }
`;

export const CriticalBar = styled(Row)`
  background-color: ${({ theme }) => theme.palette.Red20};
  color: ${({ theme }) => theme.palette.Red100};
  align-items: center;
  padding: 10px 20px;
  gap: 10px;
  ${Body("regular", "medium")}
  border-radius: 20px;
  & span {
    background-color: ${({ theme }) =>
      theme.isHighContrast ? theme.palette.Red100 : "transparent"};
  }
  & span::before {
    font-size: 30px;
  }
`;

export const GreenBar = styled(Row)`
  background-color: ${({ theme }) => theme.palette.Green20};
  color: ${({ theme }) => theme.palette.Green100};
  align-items: center;
  padding: 10px 20px;
  gap: 10px;
  ${Body("regular", "medium")}
  border-radius: 20px;
  & span {
    border-radius: 20px;
    background-color: ${({ theme }) =>
      theme.isHighContrast ? theme.palette.Green100 : "transparent"};
  }
  & span::before {
    font-size: 30px;
  }
`;

export const ListContainer = styled(Col)`
  position: relative;
  background-color: ${({ theme }) => theme.palette.White};
  border: 2px solid
    ${({ theme }) =>
      theme.isHighContrast ? theme.palette.Grey70 : "transparent"};
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

interface IText {
  margin?: string;
  padding?: string;
  width?: string;
  isNoWrap?: boolean;
  isCapitalize?: boolean;
  textTransform?: string;
  type?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "body"
    | "caption"
    | "footer";
  weight?: "bold" | "medium" | "regular";
  size?: "large" | "medium" | "small";
  color?: string;
  textAlign?: string;
  textDecoration?: string;
  zIndex?: number;
}

const getFontStyle = (
  type: IText["type"],
  weight: IText["weight"],
  size: IText["size"]
) => {
  if (type === "body") return Body(weight, size);
  if (type === "caption")
    return Caption(weight, size === "medium" ? undefined : size);
  if (type === "footer") return Footer(weight);

  if (type === "h1" && size === "large")
    return Heading1Large(weight === "regular" ? undefined : weight);
  if (type === "h1" && size === "small")
    return Heading1Small(weight === "regular" ? undefined : weight);

  if (type === "h2" && size === "large")
    return Heading2Large(weight === "regular" ? undefined : weight);
  if (type === "h2" && size === "small")
    return Heading2Small(weight === "regular" ? undefined : weight);

  if (type === "h3" && size === "large")
    return Heading3Large(weight === "regular" ? undefined : weight);
  if (type === "h3" && size === "small")
    return Heading3Small(weight === "regular" ? undefined : weight);

  if (type === "h4" && size === "large")
    return Heading4Large(weight === "regular" ? undefined : weight);
  if (type === "h4" && size === "small")
    return Heading4Small(weight === "regular" ? undefined : weight);

  if (type === "h5" && size === "large")
    return Heading5Large(weight === "regular" ? undefined : weight);
  if (type === "h5" && size === "small")
    return Heading5Small(weight === "regular" ? undefined : weight);

  if (type === "h6" && size === "large")
    return Heading6Large(weight === "regular" ? undefined : weight);
  if (type === "h6" && size === "small")
    return Heading6Small(weight === "regular" ? undefined : weight);

  return "";
};

export const Text = styled.p<IText>`
  ${({ type, weight, size }) => (type ? getFontStyle(type, weight, size) : "")}
  white-space: ${({ isNoWrap = false }) => (isNoWrap ? "nowrap" : "wrap")};
  text-transform: ${({ textTransform }) => textTransform || "none"};
  margin: ${({ margin }) => margin || "0"};
  padding: ${({ padding }) => padding || "0"};
  width: ${({ width }) => width || "unset"};
  color: ${({ color, theme }) => color || theme.palette.Grey90};
  text-decoration: ${({ textDecoration }) => textDecoration || "none"};
  text-align: ${({ textAlign }) => textAlign || "left"};
  z-index: ${({ zIndex }) => zIndex || 0};
  &::first-letter {
    text-transform: ${({ isCapitalize = false }) =>
      isCapitalize ? "capitalize" : "none"};
  }
`;
