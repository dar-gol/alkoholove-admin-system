import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { FormProvider, useForm } from 'react-hook-form';
import { Container, Row } from '../styles/global.styled';
import FileInput from '../components/FileInput/fileInput';

export default {
  title: 'Form/FileInput',
  component: FileInput,
  argTypes: {
    name: {
      name: 'name',
      defaultValue: 'test',
      description:
        'This props is responsible for the field name. After the submit event, this name can be used to refer to this field.',
      table: {
        type: {
          summary: 'string',
          detail: 'The name can be anything you like',
        },
        defaultValue: { summary: null },
      },
      control: {
        type: null,
      },
    },
    title: {
      description: 'Name displayed as label.',
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: { summary: null },
      },
    },
    required: {
      description: 'If the field is true, it must be completed before submit.',
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: { summary: null },
      },
    },
    placeholder: {
      description: 'This field is displayed when nothing has been entered.',
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: { summary: null },
      },
    },
    remove: {
      description:
        'Function to remove file. Callback give you type of the image (sm or md)',
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: { summary: null },
      },
    },
    imageName: {
      description:
        'You can give the name of the file to be loaded from the database',
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: { summary: null },
      },
    },
  },
} as ComponentMeta<typeof FileInput>;

const Template: ComponentStory<typeof FileInput> = (args) => {
  const methods = useForm({});
  return (
    <Container>
      <Row margin="0 50px 50px 50px">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(() => {})} style={{ flex: 1 }}>
            <FileInput {...args} />
          </form>
        </FormProvider>
      </Row>
    </Container>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  name: 'FileInput',
  title: 'Lorem ipsum',
  required: false,
  placeholder: 'It is a first component',
  remove: (type) => {},
};
