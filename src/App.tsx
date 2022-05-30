import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import AlcoholDetails from './containers/AlcoholDetails/alcoholDetails';
import AddAlcohol from './containers/AddAlcohol/addAlcohol';
import User from './containers/user';
import Login from './containers/Login/Login';
import Home from './containers/Home/home';
import Category from './containers/Category/category';
import AddCategory from './containers/AddCategory/addCategory';
import AlcoholList from './containers/AlcoholList/alcoholList';

import { Main } from './styles/global.styled';

import useLogin from './utils/hooks/useLogin';

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
        <Route path="/alcohol/:alcoholBarcode" element={<AlcoholDetails />} />
        <Route path="/alcohol/add" element={<AddAlcohol />} />
        <Route path="/alcohol" element={<AlcoholList />} />
        <Route path="/category/add" element={<AddCategory />} />
        <Route path="/category/edit/:categoryName" element={<AddCategory />} />
        <Route path="/category" element={<Category />} />
        <Route path="/category/edit" element={<Category />} />

        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Main>
  );
};
export default App;
