import React, { useEffect, useState } from 'react';
import { Alcohols, IAlcohol } from '../../@types/alcohol';
import { IReq } from '../../@types/fetch';
import { IPageInfo } from '../../@types/pagination';
import { API } from '../constant';
import useAuthReq from './useReq';
import useUser from './useUser';

const initPageInfo: IPageInfo = {
  limit: 10,
  offset: 0,
  total: 10,
  number: 0,
} as const;

const initReq = ['GET', `${API}/alcohols?limit=10&offset=0`, null] as const;

const useAlcohols = () => {
  const { get } = useUser();
  const [alcohols, setAlcohols] = useState<Alcohols | null>(null);
  const [name, setName] = useState<string>('');
  const [page, setPage] = useState<IPageInfo>(initPageInfo);
  const { send } = useAuthReq(...initReq);

  const update = (req: IReq = {}) => {
    send({ ...req })
      .then((data: Response) => data.json())
      .then((data: { alcohols: Alcohols; page_info: IPageInfo }) => {
        setAlcohols(data.alcohols);
        setPage((prev) => ({ ...prev, ...data.page_info }));
      })
      .catch((e) => console.error(e));
  };

  const search = (input: string) => {
    update({
      url: `${API}/alcohols?limit=${page.limit}&offset=0&phrase=${input}`,
    });
    setName(input);
  };

  const changePage = (index: number) => {
    const shift = index * page.limit;
    setPage((prev) => ({
      ...prev,
      number: index,
    }));
    update({
      url: `${API}/alcohols?limit=${page.limit}&offset=${shift}&phrase=${name}`,
    });
  };

  const changePageSize = (limit: number) => {
    setPage((prev) => ({
      ...prev,
      limit,
      number: 0,
    }));
    update({
      url: `${API}/alcohols?limit=${limit}&offset=0&phrase=${name}`,
    });
  };

  const remove = (id: number) => {
    setAlcohols((prev: any): any => [
      ...prev.filter((alcohol: IAlcohol) => alcohol.id !== id),
    ]);
  };

  useEffect(() => {
    if (get().access_token) update();
  }, [get().access_token]);

  return {
    search,
    remove,
    changePageSize,
    changePage,
    alcohols,
    page,
  };
};

export default useAlcohols;
