import React from 'react';

import Header from '../../components/Header/header';
import Breadcrumb from '../../components/Breadcrumb/breadcrumb';
import { Col, Container, Row, Title } from '../../styles/global.styled';
import { Block } from './home.styled';

const Home = () => (
  <>
    <Header />
    <Breadcrumb />
    <Container>
      <Row>
        <Col flex="1">
          <Title>Listy</Title>
          <Block to="/alcohol">Alkohole</Block>
          <Block to="/category">Kategorie</Block>
          <Block to="/users">Uzytkownicy</Block>
          <Block to="/errors">Zgłoszone błędy</Block>
        </Col>
        <Col flex="1">
          <Title>Akcje</Title>
          <Block to="/alcohol/add">Dodaj alkohol</Block>
          <Block to="/category/add">Dodaj kategorię</Block>
        </Col>
      </Row>
    </Container>
  </>
);

export default Home;
