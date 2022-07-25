import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import AlcoholBlock from '../components/AlcoholBlock/AlcoholBlock';
import { Container } from '../styles/global.styled';
import { IAlcohol } from '../@types/alcohol';
import UserProvider from '../context/userContext';

const alcohol: IAlcohol = {
  name: 'Jägermeister',
  kind: 'likier',
  type: 'ziołowy',
  alcohol_by_volume: 35,
  description:
    'Skład likieru Jägermeister od niemal stu lat utrzymywana jest w tajemnicy. Jak wiadomo z etykiety, likier zawiera aż 56 ziół i przypraw, które od lat niezmiennie budują smak i aromat trunku.',
  color: 'ciemny',
  manufacturer: 'Mast-Jägermeister SE',
  country: 'Niemcy',
  region: '',
  food: [],
  finish: [],
  aroma: ['imbir', 'goździki'],
  taste: ['imbir', 'skórki cytrusów', 'ziołowy'],
  id: '6265775246452354',
  avg_rating: 5,
  rate_count: 1,
  rate_value: 5,
  barcode: ['4067700014665', '4067700014689'],
  keywords: ['ziołowy', 'leczniczy'],
  additional_properties: [],
};

export default {
  title: 'Lists/Element',
  component: AlcoholBlock,
  parameters: {
    docs: {
      description: {
        component: `This is a block in the list of alcohol in this case. It must be covered by Router and UserContext. It has buttons to remove a given alcohol and the ability to edit the selected alcohol. It is also wrapped in Container Block to enhance the visual impact. The Container Tag is contained in global.styled.tsx
        `,
      },
    },
  },
  argTypes: {
    alcohol: {
      name: 'alcohol',
      description:
        'The Alcohol type is included in /@types/alcohol. It contains all the characteristics of the core type and other suitable alcohol. For example, in the case of wine, we have objects of the type id, barcode, name, etc., and typical for wine, i.e. wine cellar, temperature, etc.',
    },
    update: {
      description:
        'Responsible for updating the list of alcohol blocks, so we must additionally provide the id',
    },
    index: {
      description:
        'This variable is only for the purpose of numbering alcohol blocks',
    },
  },
} as ComponentMeta<typeof AlcoholBlock>;

const Template: ComponentStory<typeof AlcoholBlock> = (args) => (
  <UserProvider>
    <BrowserRouter>
      <Container>
        <AlcoholBlock {...args} />
      </Container>
    </BrowserRouter>
  </UserProvider>
);

export const Primary = Template.bind({});
Primary.args = {
  alcohol,
  update: () => {},
  index: 1,
};
