import React, { ComponentType, ReactNode } from "react";
import HeaderLogic from "../../components/Header/header.logic";
import SidebarLogic from "../../components/Sidebar/Sidebar.logic";
import {
  Col,
  ContentWrapper,
  PanelContainer,
  Row,
} from "../../styles/global.styled";

function withDashboardWrapper<T extends {}>(Component: ComponentType<T>) {
  return (props: T) => {
    const t = 1;
    return (
      <PanelContainer>
        <SidebarLogic />
        <Col flex="1">
          <Row>
            <HeaderLogic />
          </Row>
          <ContentWrapper flex="1">
            <Component {...(props as T)} />
          </ContentWrapper>
        </Col>
      </PanelContainer>
    );
  };
}

export default withDashboardWrapper;
