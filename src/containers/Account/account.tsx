import React, { useContext } from 'react';
import { UserContextType } from '../../@types/user';
import Breadcrumb from '../../components/Breadcrumb/breadcrumb';
import Header from '../../components/Header/header';
import { UserContext } from '../../context/userContext';
import { Container } from '../../styles/global.styled';

const Account = () => {
  const { user } = useContext(UserContext) as UserContextType;
  return (
    <>
      <Header />
      <Breadcrumb />
      <Container>
        <b>Access Token: </b>
        <p>{user.access_token}</p>
        <b>Refresh Token: </b>
        <p>{user.refresh_token}</p>
      </Container>
    </>
  );
};

export default Account;
