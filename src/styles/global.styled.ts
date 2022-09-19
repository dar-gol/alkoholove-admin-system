import { Link } from "react-router-dom";
import styled, { css, createGlobalStyle } from "styled-components";
import { Body, Heading2, Heading3, Heading4 } from "./typography.styled";

export const Test1 = styled.section``;
export const Test2 = styled.section``;

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
};

type Button = {
  margin?: string;
};

const Btn = css`
  border: 0;
  border-radius: ${borderRadius};
  cursor: pointer;
  width: 200px;
  height: 48px;
  white-space: nowrap;
  transition: 0.2s;
  z-index: 0;
  position: relative;
  ${Body("medium", "large")};
  &:disabled {
    pointer-events: none;
  }
  &:hover {
    box-shadow: 0px 3px 10px
      ${({ theme }) => theme.palette.BackgroundTransparency20};
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
`;

export const Row = styled(Div)`
  display: flex;
`;

export const Col = styled(Div)`
  display: flex;
  flex-direction: column;
`;

export const Container = styled.article`
  padding: 30px;
  margin: 20px auto;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
  max-width: 678px;
`;

export const Title = styled.h2`
  ${Heading2()}
  text-align: center;
  margin-top: 0;
  margin-bottom: 30px;
`;

export const ListTitle = styled.h2`
  ${Heading3()}
  margin-left: 10px;
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
  margin: ${({ margin }) => margin || ""};
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
`;

export const BtnSecondary = styled.button<Button>`
  ${Btn}
  margin: ${({ margin }) => margin || ""};
  color: ${({ theme }) => theme.palette.White};
  background-color: ${({ theme }) => theme.palette.btnSecondary};
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

export const CapitalCase = styled.span`
  white-space: nowrap;
  text-transform: capitalize;
`;

export const Tuple = styled.section`
  display: flex;
  border-bottom: 2px solid ${({ theme }) => theme.palette.grey};
  justify-content: space-between;
  &:last-of-type {
    border-bottom: 0;
  }
`;

export const Key = styled.p`
  color: ${({ theme }) => theme.palette.grey};
`;

export const Value = styled.p`
  color: black;
  font-weight: 600;
  text-align: right;
`;

export const WarnText = styled.p`
  ${Heading4()}
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
`;

export const PanelContainer = styled.article`
  display: flex;
  height: 100%;
`;
