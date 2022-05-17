import { useContext } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContextType, Tokens } from '../../@types/user';
import { UserContext } from '../../context/userContext';
import { API } from '../constant';
import { postForm } from '../fetch';

const useLogin = () => {
  const { setAdmin } = useContext(UserContext) as UserContextType;
  const [cookie, setCookie] = useCookies(['user']);
  const navigate = useNavigate();
  const location = useLocation();
  const checkLogin = () =>
    new Promise((resolve, reject) => {
      if (cookie) resolve(true);
      else reject(new Error("You don't have cookie"));
    })
      .then(() => {
        setAdmin({
          access_token: cookie.user.access_token,
          refresh_token: cookie.user.refresh_token,
        });
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
        console.log(data, cookie);
        const { access_token, refresh_token } = data;
        setCookie(
          'user',
          {
            access_token,
            refresh_token,
          },
          { path: '/' }
        );
        setAdmin({
          access_token,
          refresh_token,
        });
        navigate('home');
      })
      .catch((e) => console.log(e));
  return {
    loginHandler,
    checkLogin,
  };
};

export default useLogin;
