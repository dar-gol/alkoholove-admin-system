import React from "react";
import { Content } from "../../styles/global.styled";
import AlcoholChartApollo from "../../components/AlcoholChart/AlcoholChart.apollo";
import withDashboardWrapper from "../../utils/hoc/withDashboardWrapper";

const Home = () => (
  <Content flex="1" width="0">
    <AlcoholChartApollo />
  </Content>
);

export default withDashboardWrapper(Home);
