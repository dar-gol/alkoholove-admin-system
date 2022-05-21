import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Tokens } from '../../@types/user';
import { API } from '../constant';
import { post, postForm } from '../fetch';
import useUser from './useUser';

const useLogin = () => {
  const { set, getCookie, checkCookie, get, remove } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const checkLogin = () =>
    new Promise((resolve, reject) => {
      if (checkCookie()) resolve(true);
      else reject(new Error("You don't have cookie"));
    })
      .then(() => {
        set(getCookie());
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
        set({ ...data });
        navigate('home');
      })
      .catch((e) => console.log(e));
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
  };
};

export default useLogin;
