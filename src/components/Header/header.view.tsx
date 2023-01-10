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
  isContrast: boolean;
  modeHandler: () => void;
  contrastModeHandler: () => void;
  show: boolean;
  setShow: () => void;
  getTitle: () => string;
}

const HeaderView = ({
  logout,
  night,
  modeHandler,
  isContrast,
  contrastModeHandler,
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
          value={isContrast}
          onClick={contrastModeHandler}
          title={`${!isContrast ? "Włącz" : "Wyłącz"} wysoki kontrast`}
          color={theme.palette.Grey5}
          rightColor={theme.palette.Green70}
          leftColor={theme.palette.Grey30}
        />
        <Toggle
          leftIcon="icon-sun"
          leftColor={theme.palette.Yellow70}
          rightIcon="icon-night"
          rightColor={theme.palette.Grey50}
          value={night}
          onClick={modeHandler}
        />
        <Profil>
          <Icon className="icon-Profil" onClick={setShow} />
          <PopupApollo logout={logout} show={show} />
        </Profil>
      </Row>
    </Container>
  );
};

export default HeaderView;
