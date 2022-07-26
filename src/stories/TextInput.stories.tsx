import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { FormProvider, useForm } from 'react-hook-form';
import TextInput from '../components/SimpleInput/TextInput';
import DoubleInput from '../components/SimpleInput/DoubleInput';
import NumberInput from '../components/SimpleInput/NumberInput';
import Textarea from '../components/SimpleInput/Textarea';
import { Row } from '../styles/global.styled';

export default {
  title: 'Form/SimpleInputs',
  component: TextInput,
  parameters: {
    docs: {
      description: {
        component: `Simple text or numeric inputs.
          These components use react-hook-form (useFormContext).
          "name" props is used as the field so an error will occur if you do not specify it.
          The component is wrapped in a FormProvidera and all useForm methods have been passed.
          You can forward a callback to onSubmit in the form
        `,
      },
    },
  },
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
        defaultValue: { summary: null },
      },
    },
    required: {
      description: 'If the field is true, it must be completed before submit.',
      table: {
        defaultValue: { summary: null },
      },
    },
    placeholder: {
      description: 'This field is displayed when nothing has been entered.',
      table: {
        defaultValue: { summary: null },
      },
    },
    type: {
      defaultValue: 'TextInput',
      options: ['TextInput', 'DoubleInput', 'NumberInput', 'Textarea'],
      control: { type: 'select' },
      table: {
        type: {
          summary: 'TextInput | NumberInput | DoubleInput',
        },
        defaultValue: { summary: 'TextInput' },
      },
      description:
        'You can choose from three types: TextInput (plain text field), NumberInput (numeric field), DoubleInput (floating point numeric field). THIS IS NOT A PROPS (You must to check on of the component)',
    },
  },
} as ComponentMeta<typeof TextInput>;

const Factory = ({ type, ...args }: any) => {
  if (type === 'TextInput') return <TextInput {...args} />;
  if (type === 'DoubleInput') return <DoubleInput {...args} />;
  if (type === 'NumberInput') return <NumberInput {...args} />;
  if (type === 'Textarea') return <Textarea {...args} />;
  return <TextInput {...args} />;
};

const Template: ComponentStory<typeof TextInput> = (args) => {
  const methods = useForm({});
  return (
    <Row margin="0 50px 50px 50px">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(() => {})}>
          <Factory {...args} />
        </form>
      </FormProvider>
    </Row>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  name: 'TextInput',
  title: 'Lorem ipsum',
  required: false,
  placeholder: 'It is a first component',
};
