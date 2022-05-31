import { useState, useEffect, useContext } from 'react';
import { useCookies } from 'react-cookie';
import { Tokens, UserContextType } from '../../@types/user';
import { UserContext } from '../../context/userContext';

const useUser = () => {
  const { user, setAdmin } = useContext(UserContext) as UserContextType;
  const [cookie, setCookie] = useCookies(['user']);

  const get = (): Tokens => {
    const tokens = user.access_token ? user : cookie.user;
    return { ...tokens };
  };

  const checkCookie = (): boolean => !!cookie?.user?.access_token;

  const set = (tokens: Tokens): void => {
    setAdmin({ ...tokens });
    setCookie('user', { ...tokens }, { path: '/' });
  };

  const remove = (): void => {
    setAdmin({ access_token: '', refresh_token: '' });
    setCookie('user', '', { path: '/' });
  };

  return { get, set, remove, checkCookie };
};

export default useUser;
