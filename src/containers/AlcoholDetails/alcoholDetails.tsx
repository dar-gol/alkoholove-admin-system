import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAlcohol from '../../utils/hooks/useAlcohol';
import Breadcrumb from '../../components/Breadcrumb/breadcrumb';
import Header from '../../components/Header/header';
import { API } from '../../utils/constant';
import { get } from '../../utils/fetch';
import { createImageName } from '../../utils/utils';
import useCategory from '../../utils/hooks/useCategory';
import {
  BtnPrimary,
  BtnSecondary,
  CapitalCase,
  Col,
  Container,
  Key,
  Row,
  Tuple,
  Value,
} from '../../styles/global.styled';
import { Title } from '../AddAlcohol/addAlcohol.styled';

const AlcoholDetails = () => {
  const { alcoholBarcode } = useParams();
  const alcohol = useAlcohol(alcoholBarcode || '');
  const { getCategory } = useCategory();

  const JSX =
    alcohol &&
    getCategory(alcohol.kind, false, false).properties.map((prop) => {
      // console.log({ prop });
      const {
        name,
        metadata: { title },
      } = prop;
      const value = alcohol[name as keyof typeof alcohol];
      console.log({ value });
      const formatValue =
        typeof value === 'object' && value !== null ? value.join(' | ') : value;
      return (
        <Tuple key={name}>
          <Key>
            <CapitalCase>{title}</CapitalCase>
          </Key>
          <Value>{formatValue || 'Brak danych*'}</Value>
        </Tuple>
      );
    });

  return (
    <>
      <Header />
      <Breadcrumb />
      <Container>
        <Title>Szczegółowe informacje</Title>
        <Col>{JSX}</Col>
        <Row justifyContent="center">
          <Col>
            <img
              src={`${API}/static/${createImageName(
                alcohol?.name.toLowerCase() || '',
                'sm'
              )}.png`}
              alt="Zdjęcie przedstawiające wybrany alkohol"
            />
          </Col>
        </Row>
        <Row justifyContent="flex-end" gap="20px">
          <BtnPrimary>Edytuj alkohol</BtnPrimary>
          <BtnSecondary>Usuń alkohol</BtnSecondary>
        </Row>
      </Container>
    </>
  );
};

export default AlcoholDetails;
