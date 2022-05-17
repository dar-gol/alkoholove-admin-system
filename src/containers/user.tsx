import React, { useContext } from 'react';
import { UserContextType } from '../@types/user';
import { UserContext } from '../context/userContext';

const User = () => {
  const { user } = useContext(UserContext) as UserContextType;
  return (
    <>
      <b>Access Token: </b>
      <p>{user.access_token}</p>
      <b>Refresh Token: </b>
      <p>{user.refresh_token}</p>
    </>
  );
};

export default User;
