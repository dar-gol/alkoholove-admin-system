import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Tokens } from '../../@types/user';
import { API } from '../constant';
import { post, postForm } from '../fetch';
import useUser from './useUser';

const useLogin = () => {
  const { set, checkCookie, get, remove } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState<string>('');
  const checkLogin = () =>
    new Promise((resolve, reject) => {
      if (checkCookie()) resolve(true);
      else reject(new Error("You don't have cookie"));
    })
      .then(() => {
        set(get());
        if (location.pathname === '/') navigate('home');
      })
      .catch(() => {
        if (location.pathname !== '/') navigate('/');
      });
  const loginHandler = (username: string, password: string) =>
    postForm({
      url: `${API}/auth/token`,
      body: { username, password },
    })
      .then((data: Tokens) => {
        if (!data?.access_token) throw data;
        set({
          access_token: `${data.access_token}`,
          refresh_token: `${data.refresh_token}`,
        });
        navigate('home');
      })
      .catch((e) =>
        setError(
          e?.detail ||
            'Problem with reading error, propably wrong login details'
        )
      );
  const logout = () => {
    post({
      url: `${API}/auth/logout`,
      header: {
        Authorization: `Bearer ${get().access_token}`,
        'authorization-refresh': `${get().refresh_token}`,
      },
      body: '',
    });
    remove();
    navigate('/');
  };
  return {
    loginHandler,
    checkLogin,
    logout,
    error,
    setError,
  };
};

export default useLogin;
