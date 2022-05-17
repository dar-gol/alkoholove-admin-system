import React from 'react';

import Header from '../../components/Header/header';
import AlcoholList from '../../components/AlcoholList/alcoholList';
import Breadcrumb from '../../components/Breadcrumb/breadcrumb';

const Home = () => (
  <>
    <Header />
    <Breadcrumb />
    <AlcoholList />
  </>
);

export default Home;
