import React, { useState } from 'react';
import { IAlcohol } from '../../@types/alcohol';
import {
  BtnPrimary,
  BtnSecondary,
  Col,
  LinkSecondary,
  Row,
} from '../../styles/global.styled';
import { API, URL } from '../../utils/constant';
import useAuthReq from '../../utils/hooks/useReq';
import ErrorModal from '../ErrorModal/errorModal';
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

type IModal = {
  open: boolean;
  title: string;
  text: string;
  details: string;
};

const AlcoholBlock = ({
  alcohol,
  update,
  index,
}: {
  alcohol: IAlcohol;
  update: (id: number) => void;
  index: number;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [errorModal, setErrorModal] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { send } = useAuthReq('DELETE', '', '');

  const removeTrigger = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const remove = async (id: number) => {
    setIsOpen(false);
    setIsLoading(true);
    try {
      const test = await send({ url: `${API}${URL.POST_ALCOHOLS}/${id}` });
      update(id);
    } catch (e: any) {
      setErrorModal(JSON.stringify(e?.statusText));
    } finally {
      setIsLoading(false);
    }
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
          <LinkSecondary to={`/alcohol/edit/${alcohol.barcode[0]}`}>
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
        <Col padding="0">
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
      <ErrorModal
        isOpen={!!errorModal}
        onClose={() => setErrorModal('')}
        title="Problem z usunięciem alkoholu"
        text=""
        details={errorModal}
      />
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
