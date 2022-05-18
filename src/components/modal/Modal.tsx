import React from 'react';
import { ModalContainer, StyledPopup } from './Modal.styled';

interface Props {
  children: React.ReactNode;
  isOpen: boolean | undefined;
  onClose: () => void;
  isClosable?: boolean;
}

const Modal: React.FC<Props> = ({ children, isOpen, onClose, isClosable }) => (
  <StyledPopup
    open={isOpen}
    onClose={onClose}
    modal
    nested
    closeOnDocumentClick={isClosable}
    closeOnEscape={isClosable}
  >
    <ModalContainer>{children}</ModalContainer>
  </StyledPopup>
);

Modal.defaultProps = {
  isClosable: true,
};

export default Modal;
