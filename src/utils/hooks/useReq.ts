/* eslint-disable camelcase */
/* eslint-disable consistent-return */
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Method, Url, Body, Header, IReq } from '../../@types/fetch';
import { API, STATUS_CODE } from '../constant';
import useUser from './useUser';

type ResSuccess = {
  type: 'success';
  data: Response;
};

type ResError = {
  type: 'error';
  status: string | Error;
};

const useAuthReq = (
  initMethod: Method,
  initUrl: Url,
  initBody: Body,
  initHeader?: Header
) => {
  const { set, get, remove } = useUser();
  const navigate = useNavigate();

  const request = async (
    method?: Method,
    url?: Url,
    body?: Body,
    header?: Header
  ) => {
    try {
      if (!get().access_token) throw new Error(`401`);
      const data = await fetch(url || initUrl, {
        method: method || initMethod,
        headers: {
          Authorization: `Bearer ${get().access_token}`,
          ...(header || initHeader),
        },
        ...((method || initMethod) !== 'GET' ? { body: body || initBody } : {}),
      });
      if (data.ok) return { type: 'success', data } as ResSuccess;
      throw new Error(`${data.status}`);
    } catch (error) {
      if (error instanceof Error)
        return { type: 'error', status: error.message } as ResError;
      return { type: 'error', status: error } as ResError;
    }
  };

  const loginNavigate = (isNavigate: boolean) => {
    if (isNavigate) {
      remove();
      navigate('/');
    }
  };

  const handleAuthError = async (e: any) => {
    if (
      e?.message === STATUS_CODE.UNAUTHORIZED ||
      e?.message === STATUS_CODE.METHOD_NOT_ALLOWED
    ) {
      const refresh = await request('POST', `${API}/auth/refresh`, '', {
        Authorization: `Bearer ${get().refresh_token}`,
      });
      if (refresh.type === 'error') {
        loginNavigate(true);
        return false;
      }
      const tokens = await refresh.data.json();
      set({ ...tokens });
      return tokens;
    }
    return false;
  };

  const send = async ({ method, body, header, url }: IReq) => {
    try {
      const res = await request(method, url, body, header);
      if (res.type === 'success') return res.data;
      throw new Error(`${res.status}`);
    } catch (e) {
      console.log({ ERROR: e });
      const isRefresh = await handleAuthError(e);
      if (isRefresh)
        send({
          header: {
            Authorization: `Bearer ${isRefresh.access_token}`,
            ...(header || initHeader),
          },
        });
      throw e;
    }
  };

  return { send };
};

export default useAuthReq;
