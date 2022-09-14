import React from "react";

import { Col, Container, Row, Title } from "../../styles/global.styled";
import { Block, Content, PanelContainer } from "./home.styled";
import SidebarLogic from "../../components/Sidebar/Sidebar.logic";
import HeaderLogic from "../../components/Header/header.logic";

const Home = () => (
  <PanelContainer>
    <SidebarLogic />
    <Col flex="1">
      <Row>
        <HeaderLogic />
      </Row>
      <Row flex="1">
        <Content flex="1">
          <div />
        </Content>
      </Row>
    </Col>
  </PanelContainer>
);

export default Home;
