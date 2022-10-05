import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import { ThemeProvider } from "styled-components";
import { useCookies } from "react-cookie";
import AlcoholDetails from "./containers/AlcoholDetails/alcoholDetails";
import AddAlcohol from "./containers/AddAlcohol/addAlcohol";
import Account from "./containers/Account/account";
import Home from "./containers/Home/home";
import Category from "./containers/Category/category";
import AddCategory from "./containers/AddCategory/addCategory";
import Users from "./containers/Users/users";

import { Main } from "./styles/global.styled";

import useLogin from "./utils/hooks/useLogin";
import User from "./containers/User/user";
import Errors from "./containers/Errors/errors";
import Error from "./containers/Error/error";
import createTheme from "./styles/theme";
import LoginApollo from "./containers/Login/Login.apollo";
import AlcoholListView from "./containers/AlcoholList/AlcoholList.view";
import AlcoholListApollo from "./containers/AlcoholList/AlcoholList.apollo";
import CategoryView from "./containers/Category/Category.view";
import CategoryApollo from "./containers/Category/Category.apollo";
import UsersListView from "./containers/Users/UsersList.view";
import SuggestionListView from "./containers/SuggestionList/SuggestionList.view";
import ErrorListView from "./containers/ErrorList/ErrorList.view";
import ReportedReviewListView from "./containers/ReportedReviewList/ReportedReviewList.view";

const App = () => {
  const [cookie] = useCookies();

  const theme = createTheme(cookie?.mode);
  const { checkLogin } = useLogin();
  const location = useLocation();

  useEffect(() => {
    checkLogin();
  }, [location]);
  return (
    <ThemeProvider theme={theme}>
      <Main>
        <Routes>
          <Route path="/" element={<LoginApollo />} />
          <Route path="/account" element={<Account />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/edit/alcohol/:alcoholBarcode"
            element={<AddAlcohol />}
          />
          <Route path="/add/alcohol" element={<AddAlcohol />} />
          <Route
            path="/alcohol/:kind/:alcoholBarcode"
            element={<AlcoholListApollo />}
          />
          <Route path="/alcohol" element={<AlcoholListApollo />} />
          <Route path="/alcohol/:kind" element={<AlcoholListApollo />} />
          <Route path="/add/category" element={<AddCategory />} />
          <Route path="/category" element={<CategoryApollo />} />
          <Route path="/category/:id" element={<CategoryApollo />} />
          <Route path="/user" element={<UsersListView />} />
          <Route path="/user/:id" element={<UsersListView />} />
          <Route path="/error" element={<ErrorListView />} />
          <Route path="/suggestion/" element={<SuggestionListView />} />
          <Route path="/suggestion/:id" element={<SuggestionListView />} />
          <Route path="/reportedReview/" element={<ReportedReviewListView />} />
          <Route
            path="/reportedReview/:id"
            element={<ReportedReviewListView />}
          />

          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </Main>
    </ThemeProvider>
  );
};
export default App;
