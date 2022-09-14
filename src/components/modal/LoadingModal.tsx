import React, { useEffect, useState } from "react";
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

const LoadingModal = ({ isOpen, title }: Props) => {
  const [delayOpen, setDelayOpen] = useState(false);
  const t = 1;

  useEffect(() => {
    if (isOpen) setTimeout(() => setDelayOpen(true), 800);
    else setDelayOpen(false);
  }, [isOpen]);

  return (
    <StyledPopup
      open={delayOpen}
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
};

export default LoadingModal;
