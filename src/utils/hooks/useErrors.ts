import { useEffect, useState } from 'react';
import { IError, IErrors } from '../../@types/errors';
import { IReq } from '../../@types/fetch';
import { IPageInfo } from '../../@types/pagination';
import { API, URL } from '../constant';
import useAuthReq from './useReq';

const initPageInfo: IPageInfo = {
  limit: 10,
  offset: 0,
  total: 10,
  number: 0,
} as const;

const useErrors = () => {
  const { send } = useAuthReq('GET', `${API}${URL.ERRORS}`, null, {
    accept: 'application/json',
  });
  const [errors, setErrors] = useState<IError[] | null>(null);
  const [page, setPage] = useState<IPageInfo>(initPageInfo);

  const update = (req: IReq = {}) => {
    send({ ...req })
      .then((data: Response) => data.json())
      .then((data: IErrors) => {
        setErrors(data.reported_errors);
        setPage((prev) => ({ ...prev, ...data.page_info }));
      })
      .catch((e) => console.log(e));
  };

  const changePage = (index: number) => {
    const shift = index * page.limit;
    setPage((prev) => ({
      ...prev,
      number: index,
    }));
    update({
      url: `${API}${URL.ERRORS}?limit=${page.limit}&offset=${shift}`,
    });
  };

  const changePageSize = (limit: number) => {
    setPage((prev) => ({
      ...prev,
      limit,
      number: 0,
    }));
    update({
      url: `${API}${URL.ERRORS}?limit=${limit}&offset=0`,
    });
  };

  useEffect(() => update(), []);

  return { errors, page, changePage, changePageSize };
};

export default useErrors;
