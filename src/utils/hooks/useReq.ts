/* eslint-disable prefer-promise-reject-errors */
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

  const handleResponse = (data: any) => {
    if (data.ok)
      return Promise.resolve({ type: 'success', data } as ResSuccess);
    return data.json().then((err: any) =>
      Promise.reject({
        status: data.status,
        type: 'error',
        statusText: err?.detail,
      })
    );
  };

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
      return handleResponse(data);
      // if (data.ok) return { type: 'success', data } as ResSuccess;
      // throw new Error(`${data.status}`);
    } catch (error) {
      if (error instanceof Error)
        return { type: 'error', status: error.message, statusText: '' };
      return { type: 'error', status: error, statusText: '' };
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
      e?.status === STATUS_CODE.UNAUTHORIZED ||
      e?.status === STATUS_CODE.METHOD_NOT_ALLOWED
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
      return res.data;
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
