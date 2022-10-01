import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  Heading4Large,
  Body,
  Heading3Large,
} from "../../styles/typography.styled";
import { Col, Row } from "../../styles/global.styled";

export const Header = styled(Row)`
  justify-content: center;
  position: relative;
`;

export const Logo = styled.img`
  width: 48px;
  height: 48px;
`;

export const Title = styled.h1`
  ${Heading3Large()}
  margin-bottom: 0;
  margin-top: 0;
  color: ${({ theme }) => theme.palette.Grey100};
`;

export const Subtitle = styled.h2`
  ${Body("regular", "medium")};
  color: ${({ theme }) => theme.palette.Grey40};
  margin-top: 0;
`;

export const MenuTitle = styled.div`
  border-top: 1px solid ${({ theme }) => theme.palette.Grey10};
  border-bottom: 1px solid ${({ theme }) => theme.palette.Grey10};
  display: flex;
  justify-content: center;
  ${Heading4Large("medium")}
  padding: 10px 0;
  & span:nth-child(1):before {
    display: none;
    color: ${({ theme }) => theme.palette.Grey50};
  }
`;

export const MenuLinkWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
`;

export const MenuLink = styled(Link)`
  text-decoration: none;
  border-radius: 20px;
  margin: 10px 20px;
  padding: 10px 10px;
  text-align: left;
  border: 0;
  flex: 1;
  display: flex;
  color: ${({ theme }) => theme.palette.Grey80};
  background-color: transparent;
  cursor: pointer;
  ${Body("medium", "large")}
  transition: 0.2s;
  white-space: nowrap;
  &.active,
  &:hover,
  &:focus,
  &:focus-visible,
  &:focus-within {
    color: ${({ theme }) => theme.palette.Secondary80};
    background-color: ${({ theme }) => theme.palette.Secondary20};
    padding: 10px 20px;
  }
  & span:before {
    ${Body("medium", "large")};
    font-weight: 700;
    font-size: 20px;
    font-family: icomoon;
  }
  & span:nth-child(2) {
    margin-left: 10px;
  }
`;

export const SidebarContainer = styled(Col)`
  background-color: ${({ theme }) => theme.palette.White};
  min-width: 280px;
  transition: 0.2s;
  &.collapse {
    min-width: 100px;
    ${MenuTitle} span:nth-child(1):before {
      display: block;
    }
    ${MenuLink} span:nth-child(2), ${MenuTitle} span:nth-child(2), .rightHeader {
      display: none;
    }
    ${MenuLink} {
      justify-content: center;
    }
  }
  @media (max-width: 768px) {
    & {
      display: none;
    }
  }
`;
