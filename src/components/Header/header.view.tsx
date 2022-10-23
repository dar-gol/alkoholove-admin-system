import React from "react";
import { useTheme } from "styled-components";
import { Col, Row } from "../../styles/global.styled";
import { Container, Icon, Profil, SubTitle, Title } from "./header.styled";
import Breadcrumb from "../Breadcrumb/breadcrumb";
import Toggle from "../Inputs/Toggle";
import PopupApollo from "./popup.apollo";

interface Props {
  logout: () => void;
  night: boolean;
  modeHandler: () => void;
  show: boolean;
  setShow: () => void;
  getTitle: () => string;
}

const HeaderView = ({
  logout,
  night,
  modeHandler,
  show,
  setShow,
  getTitle,
}: Props) => {
  const theme = useTheme() as { palette: { [k: string]: string } };
  return (
    <Container>
      <Col>
        <Title>{getTitle()}</Title>
        <Breadcrumb />
      </Col>
      <Row alignItems="center" gap="20px">
        <Toggle
          leftIcon="icon-sun"
          leftColor={theme.palette.Yellow70}
          rightIcon="icon-night"
          rightColor={theme.palette.Grey50}
          value={night}
          onClick={modeHandler}
        />
        <Icon className="icon-Settings" />
        <Profil>
          <Icon className="icon-Profil" onClick={setShow} />
          <PopupApollo logout={logout} show={show} />
        </Profil>
      </Row>
    </Container>
  );
};

export default HeaderView;
