import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ErrorModal from '../components/ErrorModal/errorModal';
import { BtnPrimary } from '../styles/global.styled';

export default {
  title: 'Modal/ErrorModal',
  component: ErrorModal,
  argTypes: {
    title: {
      description: 'This is a title who you see in error',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    text: {
      description: 'This is a subtitle who you see in error',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    details: {
      description:
        'This is a error description who you see in error. This can be very long and when you pass void string you dont see details label',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    isOpen: {
      description: 'You can control, that modal is open or not',
      control: {
        type: 'boolean',
      },
      table: {
        type: {
          summary: 'boolean',
        },
      },
    },
    onClose: {
      description:
        'This is function who you can control what happen when modal is closing (You have to change isOpen)',
      table: {
        type: {
          summary: '() => void',
        },
      },
    },
  },
} as ComponentMeta<typeof ErrorModal>;

const ModalWithBtn = (args: any) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <BtnPrimary onClick={() => setOpen(true)}>Open your error</BtnPrimary>
      <ErrorModal {...args} isOpen={args.isOpen && open} />
    </>
  );
};

const Template: ComponentStory<typeof ErrorModal> = (args) => (
  <ModalWithBtn {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  title: 'We have a problem',
  text: 'lorem ipsum',
  details: 'lorem ipsum lorem ipsum',
  isOpen: true,
  onClose: () => {},
};
