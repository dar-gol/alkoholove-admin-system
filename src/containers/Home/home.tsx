import React from "react";

import { Col, Container, Row, Title } from "../../styles/global.styled";
import { Block, Content, PanelContainer } from "./home.styled";
import SidebarLogic from "../../components/Sidebar/Sidebar.logic";
import HeaderLogic from "../../components/Header/header.logic";
import AlcoholChartApollo from "../../components/AlcoholChart/AlcoholChart.apollo";
import withDashboardWrapper from "../../utils/hoc/withDashboardWrapper";

const Home = () => (
  <Content flex="1">
    <AlcoholChartApollo />
  </Content>
);

export default withDashboardWrapper(Home);
