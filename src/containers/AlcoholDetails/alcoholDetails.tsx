import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAlcohol from '../../utils/hooks/useAlcohol';
import Breadcrumb from '../../components/Breadcrumb/breadcrumb';
import Header from '../../components/Header/header';
import { API, CORE, URL } from '../../utils/constant';
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

const formater = (value: any) => {
  if (!value || (typeof value === 'object' && value.length === 0))
    return 'Brak danych*';
  if (typeof value === 'object' && value !== null) return value.join(' | ');
  if (typeof value === 'boolean') return value ? 'TAK' : 'NIE';
  return value;
};

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

  const coreValues =
    alcohol &&
    CORE.map(({ name, display_name }) => (
      <Tuple key={name}>
        <Key>
          <CapitalCase>{display_name}</CapitalCase>
        </Key>
        <Value>{formater(alcohol[name as keyof typeof alcohol])}</Value>
      </Tuple>
    ));

  const additionalValues =
    alcohol &&
    alcohol.additional_properties.map(({ display_name, value }) => (
      <Tuple key={display_name}>
        <Key>
          <CapitalCase>{display_name}</CapitalCase>
        </Key>
        <Value>{formater(value)}</Value>
      </Tuple>
    ));

  return (
    <>
      <Header />
      <Breadcrumb />
      {alcohol ? (
        <Container>
          <Title>Szczeg????owe informacje</Title>
          <Col>
            {coreValues} {additionalValues}
          </Col>
          <Row justifyContent="center">
            <Col>
              <img
                src={`${URL.GET_IMAGE}/${createImageName(
                  alcohol?.name.toLowerCase() || '',
                  'sm'
                )}?t=${new Date().getTime()}`}
                alt="Zdj??cie przedstawiaj??ce wybrany alkohol"
              />
            </Col>
          </Row>
          <Row justifyContent="flex-end" gap="20px" margin="20px 0 0 0">
            <LinkPrimary to={`/alcohol/edit/${alcohol?.barcode[0]}`}>
              Edytuj alkohol
            </LinkPrimary>
            <BtnSecondary onClick={() => setIsOpen(true)}>
              Usu?? alkohol
            </BtnSecondary>
          </Row>
        </Container>
      ) : (
        <Container>
          <p>Nie ma takiego alkoholu...</p>
        </Container>
      )}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalTitle>Usuwanie alkoholu</ModalTitle>
        <WarnText>
          Czy na pewno chcesz permanentnie usun???? ten alkohol?
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
