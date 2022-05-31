import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import AlcoholDetails from './containers/AlcoholDetails/alcoholDetails';
import AddAlcohol from './containers/AddAlcohol/addAlcohol';
import Account from './containers/Account/account';
import Login from './containers/Login/Login';
import Home from './containers/Home/home';
import Category from './containers/Category/category';
import AddCategory from './containers/AddCategory/addCategory';
import AlcoholList from './containers/AlcoholList/alcoholList';
import Users from './containers/Users/users';

import { Main } from './styles/global.styled';

import useLogin from './utils/hooks/useLogin';
import User from './containers/User/user';
import Errors from './containers/Errors/errors';
import Error from './containers/Error/error';

const App = () => {
  const { checkLogin } = useLogin();
  useEffect(() => {
    checkLogin();
  }, []);
  return (
    <Main>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/account" element={<Account />} />
        <Route path="/home" element={<Home />} />
        <Route path="/alcohol/edit" element={<AlcoholList />} />
        <Route path="/alcohol/edit/:alcoholBarcode" element={<AddAlcohol />} />
        <Route path="/alcohol/add" element={<AddAlcohol />} />
        <Route path="/alcohol/:alcoholBarcode" element={<AlcoholDetails />} />
        <Route path="/alcohol" element={<AlcoholList />} />
        <Route path="/category/add" element={<AddCategory />} />
        <Route path="/category/edit/:categoryName" element={<AddCategory />} />
        <Route path="/category" element={<Category />} />
        <Route path="/category/edit" element={<Category />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/errors" element={<Errors />} />
        <Route path="/errors/:id" element={<Error />} />

        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Main>
  );
};
export default App;
