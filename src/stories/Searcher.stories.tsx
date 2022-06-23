import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Searcher from '../components/Searcher/searcher';

export default {
  title: 'Lists/Searcher',
  component: Searcher,
  parameters: {
    docs: {
      description: {
        component: `This component is responsible for controlling the amount of element in the list and also you can search.
        `,
      },
    },
  },
  argTypes: {
    setLimit: {
      description: 'Set how many element you can see on the list',
      table: {
        type: {
          summary: '(limit: number) => void',
        },
      },
    },
    update: {
      description:
        'Argument is a string who include input. You can what happend when user type.',
      table: {
        type: {
          summary: '(input: string) => void',
        },
      },
    },
    isSearch: {
      description:
        "If you don't want search input you can set this prop as TRUE",
      table: {
        type: {
          summary: 'boolean',
        },
      },
    },
  },
} as ComponentMeta<typeof Searcher>;

const Template: ComponentStory<typeof Searcher> = (args) => (
  <Searcher {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  setLimit: () => {},
  update: () => {},
  isSearch: true,
};
