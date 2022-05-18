import { IPost, IGet } from '../@types/fetch';

export const post = ({ url, body, header }: IPost) =>
  fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...header,
    },
    body: JSON.stringify(body),
  });

export const postForm = ({ url, body, header }: IPost) =>
  fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      ...header,
    },
    body: new URLSearchParams({ ...body }),
  }).then((data) => data.json());

export const postMultipart = ({ url, body, header }: any) => {
  const formData = new FormData();

  body.forEach((tuple: any) => {
    formData.append(tuple[0], tuple[1]);
  });

  return fetch(url, {
    method: 'POST',
    headers: {
      ...header,
    },
    body: formData,
  }).then((data) => data.text());
};

export const get = ({ url, header }: IGet) =>
  fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
      ...header,
    },
  }).then((data) => data.json());

export const getText = ({ url, header }: IGet) =>
  fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      ...header,
    },
  }).then((data) => data.blob());

export const del = ({ url, header }: IGet) =>
  fetch(url, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
      ...header,
    },
  });
