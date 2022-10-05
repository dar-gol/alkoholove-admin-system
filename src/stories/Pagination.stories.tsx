import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Pagination from "../components/Pagination/pagination";

export default {
  title: "Lists/Pagination",
  component: Pagination,
  parameters: {
    docs: {
      description: {
        component: `This component is responsible for controlling the page on which we are currently listed
        `,
      },
    },
  },
  argTypes: {
    lastPage: {
      description: "The last page that can be viewed by the user",
      table: {
        type: {
          summary: "number",
        },
      },
    },
    offset: {
      description:
        "Offset which is the current page we are on minus one. offset = current page - 1.",
      table: {
        type: {
          summary: "number",
        },
      },
    },
    setOffset: {
      description:
        "The function that is responsible for changing the page takes the current page as an argument (current page = offset + 1). This function should change the offset's argument.",
      table: {
        type: {
          summary: "(page: number) => void",
        },
      },
    },
  },
} as ComponentMeta<typeof Pagination>;

const Template: ComponentStory<typeof Pagination> = (args) => (
  <Pagination {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  lastPage: 20,
  pageInfo: {
    number: 0,
    limit: 10,
    offset: 0,
    total: 512,
  },
  setOffset: () => {},
};
