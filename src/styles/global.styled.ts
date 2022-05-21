import { Link } from 'react-router-dom';
import styled, { css, createGlobalStyle } from 'styled-components';
import { Heading4 } from './typography.styled';

export const Test1 = styled.section``;
export const Test2 = styled.section``;

export const Main = styled.main``;

const borderRadius = '20px';

type BlockType = {
  flex?: string;
  alignItems?: string;
  justifyContent?: string;
  margin?: string;
  padding?: string;
  position?: string;
  gap?: string;
  flexWrap?: string;
  responsive?: boolean;
};

type Button = {
  margin?: string;
};

const Btn = css`
  height: 40px;
  padding: 0 20px;
  border: 0;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
  border-radius: ${borderRadius};
  cursor: pointer;
  &:disabled {
    pointer-events: none;
  }
`;

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: Roboto;
  }
`;

export const Div = styled.section<BlockType>`
  flex: ${({ flex }) => flex || 0};
  align-items: ${({ alignItems }) => alignItems || 'stretch'};
  justify-content: ${({ justifyContent }) => justifyContent || 'flex-start'};
  margin: ${({ margin }) => margin || 0};
  padding: ${({ padding }) => padding || 0};
  position: ${({ position }) => position || 'static'};
  flex-wrap: ${({ flexWrap }) => flexWrap || 'nowrap'};
  gap: ${({ gap }) => gap || 0};
`;

export const Row = styled(Div)`
  display: flex;
`;

export const Col = styled(Div)`
  display: flex;
  flex-direction: column;
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
  ${Heading4()};
  ${Btn}
  margin: ${({ margin }) => margin || ''};
  color: ${({ theme }) => theme.palette.white};
  background: ${({ theme }) => theme.palette.btnPrimary};
`;

export const BtnSecondary = styled.button<Button>`
  ${Heading4()};
  ${Btn}
  white-space: nowrap;
  margin: ${({ margin }) => margin || ''};
  background: ${({ theme }) => theme.palette.btnSecondary};
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
