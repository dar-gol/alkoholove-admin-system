import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Modal from '../components/modal/Modal';
import { BtnPrimary } from '../styles/global.styled';

export default {
  title: 'Modal/Modal',
  component: Modal,
  argTypes: {
    isOpen: {
      description: 'You can control, that modal is open or not',
      control: {
        type: 'boolean',
      },
    },
    children: {
      description: 'You can put JSX that will be in modal',
      table: {
        type: {
          summary: 'JSX',
        },
      },
    },
    onClose: {
      description:
        'This is function who you can control what happen when modal is closing (You have to change isOpen)',
    },
    isClosable: {
      description:
        'When you check this props, you cannot close modal when you click on document or when click on ESC',
    },
  },
} as ComponentMeta<typeof Modal>;

const ModalWithBtn = ({ isOpen, isClosable, onClose, children }: any) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <BtnPrimary onClick={() => setOpen(true)}>Open your modal</BtnPrimary>
      <Modal isOpen={isOpen && open} isClosable={isClosable} onClose={onClose}>
        {children}
        <BtnPrimary onClick={() => setOpen(false)}>Close your modal</BtnPrimary>
      </Modal>
    </>
  );
};

const Template: ComponentStory<typeof Modal> = ({
  children,
  isOpen,
  isClosable,
  onClose,
}: any) => (
  <ModalWithBtn isOpen={isOpen} isClosable={isClosable} onClose={onClose}>
    {children}
  </ModalWithBtn>
);

export const Primary = Template.bind({});
Primary.args = {
  isOpen: true,
  isClosable: true,
  onClose: () => {},
  children: (
    <div>
      <h1>You can put on this section what you want :D</h1>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit
        alias quas sint soluta tenetur magni, fugiat velit, deserunt aperiam
        perferendis, earum ducimus nostrum fuga laudantium eligendi dolorem ab
        in optio?
      </p>
    </div>
  ),
};
