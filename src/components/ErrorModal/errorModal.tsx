import React from 'react';
import { BtnPrimary, Row } from '../../styles/global.styled';
import Modal from '../modal/Modal';
import { ModalTitle } from '../modal/Modal.styled';
import { Text, DetailTitle, Details } from './errorModal.styled';

interface IProps {
  title: string;
  text: string;
  details: string;
  isOpen: boolean;
  onClose: (isOpen?: boolean) => void;
}

const ErrorModal = ({ title, text, details, isOpen, onClose }: IProps) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalTitle>{title}</ModalTitle>
    <Text>{text}</Text>
    {details && (
      <>
        <DetailTitle>Szczegóły błędu: </DetailTitle>
        <Details>{details}</Details>
      </>
    )}
    <Row gap="20px" justifyContent="center">
      <BtnPrimary onClick={() => onClose()}>OK</BtnPrimary>
    </Row>
  </Modal>
);

export default ErrorModal;
