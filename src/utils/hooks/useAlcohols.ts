import React, { useEffect, useState } from 'react';
import { Alcohols, IAlcohol, IPageInfo } from '../../@types/alcohol';
import { IReq } from '../../@types/fetch';
import { API } from '../constant';
import useAuthReq from './useReq';
import useUser from './useUser';

const initPageInfo: IPageInfo = {
  limit: 10,
  offset: 0,
  total: 10,
  number: 0,
} as const;

const initReq = [
  'GET',
  `${API}/alcohols/admin?limit=10&offset=0`,
  null,
] as const;

const useAlcohols = () => {
  const { get } = useUser();
  const [alcohols, setAlcohols] = useState<Alcohols | null>(null);
  const [name, setName] = useState<string>('');
  const [page, setPage] = useState<IPageInfo>(initPageInfo);
  const { send } = useAuthReq(...initReq);

  const update = (req: IReq = {}) => {
    send({...req})
        .then((data: Response) => data.json())
        .then((data: { alcohols: Alcohols; page_info: IPageInfo }) => {
          setAlcohols(data.alcohols);
          setPage((prev) => ({ ...prev, ...data.page_info }));
        })
        .catch((e) => console.log(e));
  }

  const search = (input: string) => {
    update({
      url: `${API}/alcohols/admin?limit=${page.limit}&offset=0&name=${input}`,
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
      url: `${API}/alcohols/admin?limit=${page.limit}&offset=${shift}&name=${name}`,
    });
  };

  const changePageSize = (limit: number) => {
    setPage((prev) => ({
      ...prev,
      limit,
      number: 0,
    }));
    update({
      url: `${API}/alcohols/admin?limit=${limit}&offset=0&name=${name}`,
    });
  };

  const remove = (id: number) => {
    setAlcohols((prev: any): any => [
      ...prev.filter((alcohol: IAlcohol) => alcohol.alcohol_id !== id),
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
