import React from "react";
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

interface Props {
  handleCollapse: () => void;
  collapse: boolean;
}

const SidebarView = ({ handleCollapse, collapse }: Props) => {
  const t = 1;
  return (
    <SidebarContainer className={`${collapse ? "collapse" : ""}`}>
      <Header>
        <Indicator
          size={50}
          onClick={handleCollapse}
          icon={`icon-chevron-${collapse ? "right" : "left"}`}
          type="secondary"
        />
        <Row height="120px" gap="20px" alignItems="center">
          <Logo src="/logo192.png" alt="Alkoholove's logo" />
          <Col justifyContent="center" className="rightHeader">
            <Title>Alkoholove</Title>
            <Subtitle>Panel administracyjny</Subtitle>
          </Col>
        </Row>
      </Header>
      <MenuTitle>
        <span className="icon-Lists" />
        <span>Listy</span>
      </MenuTitle>
      <MenuLinkWrapper>
        <MenuLink className="active" to="/home">
          <span className="icon-dashboard" />
          <span>Dashboard</span>
        </MenuLink>
      </MenuLinkWrapper>
      <MenuLinkWrapper>
        <MenuLink className="" to="/alcohol">
          <span className="icon-beer" />
          <span>Alkohole</span>
        </MenuLink>
      </MenuLinkWrapper>
      <MenuLinkWrapper>
        <MenuLink className="" to="#">
          <span className="icon-Category" />
          <span>Kategorie</span>
        </MenuLink>
      </MenuLinkWrapper>
      <MenuLinkWrapper>
        <MenuLink className="" to="#">
          <span className="icon-Social" />
          <span>Uzytkownicy</span>
        </MenuLink>
      </MenuLinkWrapper>
      <MenuLinkWrapper>
        <Indicator size={50} onClick={() => {}} text="23" type="secondary" />
        <MenuLink className="" to="#">
          <span className="icon-Suggestion" />
          <span>Sugestie uzytkownikow</span>
        </MenuLink>
      </MenuLinkWrapper>
      <MenuLinkWrapper>
        <Indicator size={50} onClick={() => {}} text="0" type="secondary" />
        <MenuLink className="" to="#">
          <span className="icon-Error" />
          <span>Zgłoszone błędy</span>
        </MenuLink>
      </MenuLinkWrapper>
      <MenuLinkWrapper>
        <Indicator size={50} onClick={() => {}} text="10" type="green" />
        <MenuLink className="" to="#">
          <span className="icon-Flagged_comment" />
          <span>Oflagowane komentarze</span>
        </MenuLink>
      </MenuLinkWrapper>
      <MenuTitle>
        <span className="icon-Action" />
        <span>Akcje</span>
      </MenuTitle>
      <MenuLinkWrapper>
        <MenuLink className="" to="#">
          <span className="icon-beer" />
          <span>Dodaj alkohol</span>
        </MenuLink>
      </MenuLinkWrapper>
      <MenuLinkWrapper>
        <MenuLink className="" to="#">
          <span className="icon-Add-Category" />
          <span>Dodaj kategorie</span>
        </MenuLink>
      </MenuLinkWrapper>
    </SidebarContainer>
  );
};

export default SidebarView;
