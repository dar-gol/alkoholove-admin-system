import React from "react";
import { BtnPrimary, Row } from "../../styles/global.styled";
import Modal from "../modal/Modal";
import { ModalTitle } from "../modal/Modal.styled";
import { Text, DetailTitle, Details } from "./errorModal.styled";

interface IProps {
  title: string;
  details: string;
  isOpen: boolean;
  onClose: (isOpen?: boolean) => void;
  children?: React.ReactNode;
}

const ErrorModal = ({ title, children, details, isOpen, onClose }: IProps) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalTitle>{title}</ModalTitle>
    {children}
    {details && (
      <>
        <DetailTitle>Szczegóły błędu: </DetailTitle>
        <Details>{details}</Details>
      </>
    )}
    <Row gap="20px" justifyContent="center">
      <BtnPrimary onClick={() => onClose()} width="120px">
        Zamknij
      </BtnPrimary>
    </Row>
  </Modal>
);

export default ErrorModal;
