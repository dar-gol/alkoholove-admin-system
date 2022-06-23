import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Loader from '../components/Loader/loader';
import { BtnPrimary } from '../styles/global.styled';

export default {
  title: 'Modal/Loader',
  component: Loader,
  parameters: {
    docs: {
      description: {
        component: `This is a simple loading screen. It does not take any parameters
        `,
      },
    },
  },
} as ComponentMeta<typeof Loader>;

const Template: ComponentStory<typeof Loader> = () => <Loader />;

export const Primary = Template.bind({});
