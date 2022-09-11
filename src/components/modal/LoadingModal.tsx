import React from "react";
import { Row } from "../../styles/global.styled";
import Loader from "../Loader/loader";
import {
  LoadingContainer,
  LoadingTitle,
  ModalTitle,
  StyledPopup,
} from "./Modal.styled";

interface Props {
  isOpen: boolean | undefined;
  title: string;
}

const LoadingModal = ({ isOpen, title }: Props) => (
  <StyledPopup
    open={isOpen}
    modal
    nested
    closeOnDocumentClick={false}
    closeOnEscape={false}
  >
    <LoadingContainer>
      <img src="./logo192.png" alt="This is a alkohoLove's logo" />
      <LoadingTitle>{title}</LoadingTitle>
      <Row justifyContent="center">
        <Loader />
      </Row>
    </LoadingContainer>
  </StyledPopup>
);

export default LoadingModal;
