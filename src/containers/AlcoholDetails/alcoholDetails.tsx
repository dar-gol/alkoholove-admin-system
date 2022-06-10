import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAlcohol from '../../utils/hooks/useAlcohol';
import Breadcrumb from '../../components/Breadcrumb/breadcrumb';
import Header from '../../components/Header/header';
import { API, URL } from '../../utils/constant';
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
  LinkPrimary,
  Row,
  Tuple,
  Value,
  WarnText,
} from '../../styles/global.styled';
import { Title } from '../AddAlcohol/addAlcohol.styled';
import Modal from '../../components/modal/Modal';
import { ModalTitle } from '../../components/modal/Modal.styled';
import useAuthReq from '../../utils/hooks/useReq';

const AlcoholDetails = () => {
  const { alcoholBarcode } = useParams();
  const alcohol = useAlcohol(alcoholBarcode || '');
  const navigate = useNavigate();
  const { getCategory } = useCategory();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { send } = useAuthReq(
    'DELETE',
    `${API}${URL.POST_ALCOHOLS}/${alcohol?.id}`,
    null
  );

  const remove = async () => {
    await send({});
    navigate('/alcohol');
  };

  const JSX =
    alcohol &&
    getCategory(alcohol.kind, false, false).properties.map((prop) => {
      const {
        name,
        metadata: { title },
      } = prop;
      const value = alcohol[name as keyof typeof alcohol];
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
              src={`${URL.GET_IMAGE}/${createImageName(
                alcohol?.name.toLowerCase() || '',
                'sm'
              )}.png`}
              alt="Zdjęcie przedstawiające wybrany alkohol"
            />
          </Col>
        </Row>
        <Row justifyContent="flex-end" gap="20px">
          <LinkPrimary to={`/alcohol/edit/${alcohol?.barcode[0]}`}>
            Edytuj alkohol
          </LinkPrimary>
          <BtnSecondary onClick={() => setIsOpen(true)}>
            Usuń alkohol
          </BtnSecondary>
        </Row>
      </Container>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalTitle>Usuwanie alkoholu</ModalTitle>
        <WarnText>
          Czy na pewno chcesz permanentnie usunąć ten alkohol?
        </WarnText>
        <Col>
          <Tuple>
            <Key>ID</Key>
            <Value>{alcohol?.id}</Value>
          </Tuple>
          <Tuple>
            <Key>Nazwa</Key>
            <Value>{alcohol?.name}</Value>
          </Tuple>
        </Col>
        <Row margin="20px 0 0 0" justifyContent="center" gap="30px">
          <BtnSecondary onClick={() => remove()}>TAK</BtnSecondary>
          <BtnPrimary onClick={() => setIsOpen(false)}>NIE</BtnPrimary>
        </Row>
      </Modal>
    </>
  );
};

export default AlcoholDetails;
