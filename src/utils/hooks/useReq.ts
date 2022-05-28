/* eslint-disable camelcase */
/* eslint-disable consistent-return */
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Method, Url, Body, Header, IReq } from '../../@types/fetch';
import { API } from '../constant';
import useUser from './useUser';



const useAuthReq = (initMethod: Method, initUrl: Url, initBody: Body, initHeader?: Header) => {
  const { set, get, remove } = useUser();
  const navigate = useNavigate();

  const request = (method?: Method, url?: Url, body?: Body, header?: Header) =>fetch(url || initUrl, {
      method: method || initMethod,
      headers: {
        Authorization: `Bearer ${get().access_token}`,
        ...(header || initHeader),
      },
      ...(method !== 'GET' ? {body: body || initBody} : {}),
    })

  const loginNavigate = (isNavigate: boolean) => {
    if (isNavigate) {
      remove();
      navigate('/');
    }
  };

  const send = async ({ method, body, header, url }: IReq) => {
    try {
      const res = await request(method, url, body, header);
      if (res.status !== 200 && res.status !== 201) {
        const json = await res.json();
        throw json;
      }
      return res;
    } catch (e: any) {
      if (e?.detail === 'Signature verification failed') {
        const tokens = await fetch(`${API}/auth/refresh`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${get().refresh_token}`,
          },
        }).then((data) => data.json());
        loginNavigate(tokens?.detail === 'Signature verification failed');
        set({ ...tokens });
      }
      throw e;
    }
  };

  return { send };
};

export default useAuthReq;
