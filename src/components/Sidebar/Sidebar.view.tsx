import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Col, Row } from "../../styles/global.styled";
import Indicator from "../Indicator/Indicator";
import {
  SidebarContainer,
  Header,
  Logo,
  Title,
  Subtitle,
  MenuTitle,
  MenuLinkWrapper,
  MenuLink,
} from "./Sidebar.styled";
import { AmountObject } from "../../context/settingsContext";

interface Props {
  handleCollapse: () => void;
  collapse: boolean;
  amount: AmountObject;
}

const SidebarView = ({ handleCollapse, collapse, amount }: Props) => (
  <SidebarContainer className={`${collapse ? "collapse" : ""}`}>
    <Header>
      <Indicator
        size={50}
        top="10px"
        right="-25px"
        onClick={handleCollapse}
        icon={`icon-chevron-${collapse ? "right" : "left"}`}
        type="secondary"
      />
      <Link to="/home" style={{ all: "unset", cursor: "pointer" }}>
        <Row
          height="120px"
          gap="20px"
          alignItems="center"
          className="logoWrapper"
        >
          <Logo src="/logo192.png" alt="Alkoholove's logo" />
          <Col justifyContent="center" className="rightHeader">
            <Title>Alkoholove</Title>
            <Subtitle>Panel administracyjny</Subtitle>
          </Col>
        </Row>
      </Link>
    </Header>
    <MenuTitle>
      <span className="icon-Lists" />
      <span>Listy</span>
    </MenuTitle>
    <MenuLinkWrapper>
      <MenuLink
        className={({ isActive }) => (isActive ? "active" : "")}
        to="/home"
      >
        <span className="icon-dashboard" />
        <span>Dashboard</span>
      </MenuLink>
    </MenuLinkWrapper>
    <MenuLinkWrapper>
      <MenuLink
        className={({ isActive }) => (isActive ? "active" : "")}
        to="/alcohol"
      >
        <span className="icon-beer" />
        <span>Alkohole</span>
      </MenuLink>
    </MenuLinkWrapper>
    <MenuLinkWrapper>
      <MenuLink
        className={({ isActive }) => (isActive ? "active" : "")}
        to="/category"
      >
        <span className="icon-Category" />
        <span>Kategorie</span>
      </MenuLink>
    </MenuLinkWrapper>
    <MenuLinkWrapper>
      <MenuLink
        className={({ isActive }) => (isActive ? "active" : "")}
        to="/user"
      >
        <span className="icon-Social" />
        <span>Użytkownicy</span>
      </MenuLink>
    </MenuLinkWrapper>
    <MenuLinkWrapper>
      <Indicator
        top="10px"
        right="-25px"
        size={50}
        onClick={() => {}}
        text={amount.suggestion.value.toString()}
        type={amount.suggestion.color}
        isPressCursor={false}
      />
      <MenuLink
        className={({ isActive }) => (isActive ? "active" : "")}
        to="/suggestion"
      >
        <span className="icon-Suggestion" />
        <span>Sugestie użytkownikow</span>
      </MenuLink>
    </MenuLinkWrapper>
    <MenuLinkWrapper>
      <Indicator
        top="10px"
        right="-25px"
        size={50}
        onClick={() => {}}
        text={amount.error.value.toString()}
        type={amount.error.color}
        isPressCursor={false}
      />
      <MenuLink
        className={({ isActive }) => (isActive ? "active" : "")}
        to="/error"
      >
        <span className="icon-Error" />
        <span>Zgłoszone błędy</span>
      </MenuLink>
    </MenuLinkWrapper>
    <MenuLinkWrapper>
      <Indicator
        top="10px"
        right="-25px"
        size={50}
        onClick={() => {}}
        text={amount.reportedReview.value.toString()}
        type={amount.reportedReview.color}
        isPressCursor={false}
      />
      <MenuLink
        className={({ isActive }) => (isActive ? "active" : "")}
        to="/reportedReview"
      >
        <span className="icon-Flagged_comment" />
        <span>Oflagowane komentarze</span>
      </MenuLink>
    </MenuLinkWrapper>
    <MenuTitle>
      <span className="icon-Action" />
      <span>Akcje</span>
    </MenuTitle>
    <MenuLinkWrapper>
      <MenuLink
        className={({ isActive }) => (isActive ? "active" : "")}
        to="/add/alcohol/"
      >
        <span className="icon-beer" />
        <span>Dodaj alkohol</span>
      </MenuLink>
    </MenuLinkWrapper>
    <MenuLinkWrapper>
      <MenuLink
        className={({ isActive }) => (isActive ? "active" : "")}
        to="/add/category"
      >
        <span className="icon-Add-Category" />
        <span>Dodaj kategorie</span>
      </MenuLink>
    </MenuLinkWrapper>
  </SidebarContainer>
);

export default SidebarView;
