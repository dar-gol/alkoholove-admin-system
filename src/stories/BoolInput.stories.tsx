import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { FormProvider, useForm } from 'react-hook-form';
import { Row } from '../styles/global.styled';
import BoolInput from '../components/BoolInput/boolInput';

export default {
  title: 'Form/BoolInput',
  component: BoolInput,
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
  },
} as ComponentMeta<typeof BoolInput>;

const Template: ComponentStory<typeof BoolInput> = (args) => {
  const methods = useForm({});
  return (
    <Row margin="0 50px 50px 50px">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(() => {})} style={{ flex: 1 }}>
          <BoolInput {...args} />
        </form>
      </FormProvider>
    </Row>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  name: 'BoolInput',
  title: 'Lorem ipsum',
  required: false,
  placeholder: 'It is a first component',
};
