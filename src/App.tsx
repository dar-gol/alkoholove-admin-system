import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import AlcoholDetails from './containers/AlcoholDetails/alcoholDetails';
import AddAlcohol from './containers/AddAlcohol/addAlcohol';
import User from './containers/user';
import Login from './containers/Login/Login';
import Home from './containers/Home/home';

import { Main } from './styles/global.styled';

import useLogin from './utils/hooks/useLogin';
import AddCategory from './containers/AddCategory/addCategory';

const App = () => {
  const { checkLogin } = useLogin();
  useEffect(() => {
    checkLogin();
  }, []);
  return (
    <Main>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="user" element={<User />} />
        <Route path="home" element={<Home />} />
        <Route path="/alcohols/add" element={<AddAlcohol />} />
        <Route path="/alcohols/edit/:alcoholBarcode" element={<Home />} />
        <Route path="/alcohols/:alcoholBarcode" element={<AlcoholDetails />} />
        <Route path="/category/add" element={<AddCategory />} />

        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Main>
  );
};
export default App;
