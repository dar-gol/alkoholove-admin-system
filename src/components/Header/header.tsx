import React from 'react';
import {
  BtnSecondary,
  Col,
  LinkSecondary,
  Row,
} from '../../styles/global.styled';
import { Container, Title } from './header.styled';
import useLogin from '../../utils/hooks/useLogin';

const Header = () => {
  const { logout } = useLogin();
  return (
    <Container>
      <Row justifyContent="space-between" flex="1">
        <Col flex="1" justifyContent="center">
          <Title>AlkohoLove Panel Administracyjny</Title>
        </Col>
        <Row justifyContent="center" alignItems="center" gap="20px">
          <LinkSecondary to="/account">Konto</LinkSecondary>
          <BtnSecondary onClick={logout}>Wyloguj się</BtnSecondary>
        </Row>
      </Row>
    </Container>
  );
};

export default Header;
