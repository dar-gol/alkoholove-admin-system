import React from 'react';
import { StyledPopup } from './Modal.styled';

interface Props {
  children: React.ReactNode;
  isOpen: boolean | undefined;
  onClose: () => void;
}

const Modal: React.FC<Props> = ({ children, isOpen, onClose }) => (
  <StyledPopup
    open={isOpen}
    onClose={onClose}
    modal
    nested
    closeOnDocumentClick
    closeOnEscape
  >
    {children}
  </StyledPopup>
);

export default Modal;
