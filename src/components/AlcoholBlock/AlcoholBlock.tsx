import React, { useContext, useState } from 'react';
import { IAlcohol } from '../../@types/alcohol';
import { UserContextType } from '../../@types/user';
import { UserContext } from '../../context/userContext';
import {
  BtnPrimary,
  BtnSecondary,
  Col,
  LinkSecondary,
  Row,
} from '../../styles/global.styled';
import { API } from '../../utils/constant';
import { del } from '../../utils/fetch';
import Loader from '../Loader/loader';
import Modal from '../modal/Modal';
import { ModalTitle } from '../modal/Modal.styled';
import {
  Alcoholblock,
  More,
  WarnText,
  Tuple,
  Key,
  Value,
} from './AlcoholBlock.styled';

const AlcoholBlock = ({
  alcohol,
  update,
  index,
}: {
  alcohol: IAlcohol;
  update: (id: number) => void;
  index: number;
}) => {
  const { user } = useContext(UserContext) as UserContextType;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const removeTrigger = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const remove = async (id: number) => {
    setIsOpen(false);
    setIsLoading(true);
    await del({
      url: `${API}/alcohols/${id}`,
      header: {
        Authorization: `Bearer ${user.access_token}`,
      },
    });
    update(id);
    setIsLoading(false);
  };

  return (
    <Alcoholblock
      justifyContent="space-between"
      padding="10px 20px;"
      margin="10px"
      key={alcohol.id}
    >
      <More to={`/alcohol/${alcohol.barcode[0]}`}>
        <Row gap="10px" flex="1">
          <Col justifyContent="center">{index}.</Col>
          <Col justifyContent="center" flex="1">
            {alcohol.name}
          </Col>
          <Col flex="1">
            <Col>{alcohol.kind}</Col>
            <Col>{alcohol.type}</Col>
          </Col>
        </Row>
      </More>
      <Row gap="10px">
        <Col justifyContent="center">
          <LinkSecondary to={`/alcohols/edit/${alcohol.barcode[0]}`}>
            Edytuj
          </LinkSecondary>
        </Col>
        <Col justifyContent="center">
          <BtnSecondary onClick={removeTrigger}>Usuń</BtnSecondary>
        </Col>
      </Row>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalTitle>Usuwanie alkoholu</ModalTitle>
        <WarnText>
          Czy na pewno chcesz permanentnie usunąć ten alkohol?
        </WarnText>
        <Col>
          <Tuple>
            <Key>ID</Key>
            <Value>{alcohol.id}</Value>
          </Tuple>
          <Tuple>
            <Key>Nazwa</Key>
            <Value>{alcohol.name}</Value>
          </Tuple>
        </Col>
        <Row margin="20px 0 0 0" justifyContent="center" gap="30px">
          <BtnSecondary onClick={() => remove(alcohol.id)}>TAK</BtnSecondary>
          <BtnPrimary onClick={closeModal}>NIE</BtnPrimary>
        </Row>
      </Modal>
      <Modal isOpen={isLoading} onClose={() => {}} isClosable={false}>
        <ModalTitle>Proszę czekać aktualizujemy dane</ModalTitle>
        <Row justifyContent="center">
          <Loader />
        </Row>
      </Modal>
    </Alcoholblock>
  );
};

export default AlcoholBlock;
