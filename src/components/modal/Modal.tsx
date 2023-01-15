import React from "react";
import { useTheme } from "styled-components";
import Indicator from "../Indicator/Indicator";
import { ModalContainer, StyledPopup } from "./Modal.styled";

interface Props {
  children: React.ReactNode;
  isOpen: boolean | undefined;
  onClose: () => void;
  isClosable?: boolean;
}

const Modal: React.FC<Props> = ({ children, isOpen, onClose, isClosable }) => {
  const theme = useTheme() as { palette: { [k: string]: string } };
  return (
    <StyledPopup
      open={isOpen}
      onClose={onClose}
      modal
      nested
      closeOnDocumentClick={isClosable}
      closeOnEscape={isClosable}
    >
      <Indicator
        visible={isClosable}
        size={40}
        backgroundColor={theme.palette.White}
        top="15px"
        right="-20px"
        icon="icon-Exit"
        onClick={() => onClose()}
        type="secondary"
      />
      <ModalContainer>{children}</ModalContainer>
    </StyledPopup>
  );
};

Modal.defaultProps = {
  isClosable: true,
};

export default Modal;
