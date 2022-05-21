/* eslint-disable camelcase */
/* eslint-disable consistent-return */
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { API } from '../constant';
import useUser from './useUser';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';
type Url = string;
type Header = object;
type Body = string | FormData | URLSearchParams | null;

interface IReq {
  method: Method;
  url: Url;
  header: Header;
  body: Body;
}

const useAuthReq = (method: Method, url: Url, body: Body, header?: Header) => {
  const [req, setReq] = useState<IReq>({
    method,
    url,
    header: header || {},
    body,
  });
  const { set, get, remove } = useUser();
  const navigate = useNavigate();

  const request = () =>
    fetch(req.url, {
      method: req.method,
      headers: {
        Authorization: `Bearer ${get().access_token}`,
        ...req.header,
      },
      body: req.body,
    });

  const loginNavigate = (isNavigate: boolean) => {
    if (isNavigate) {
      remove();
      navigate('/');
    }
  };

  const send = async () => {
    try {
      const res = await request();
      if (res.status !== 200 && res.status !== 201) {
        const json = await res.json();
        throw json;
      }
      return res;
    } catch (e: any) {
      console.log(e);
      if (e?.detail === 'Signature verification failed') {
        const tokens = await fetch(`${API}/auth/refresh`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${get().refresh_token}`,
          },
        }).then((data) => data.json());
        console.log(tokens?.detail);
        loginNavigate(tokens?.detail === 'Signature verification failed');
        set({ ...tokens });
      }
      throw e;
    }
  };

  const update = (updateReq: { url?: Method; body?: Body }) => {
    setReq((prev) => ({
      ...prev,
      url: updateReq.url || prev.url,
      body: updateReq.body || prev.body,
    }));
  };

  return { send, update };
};

export default useAuthReq;
