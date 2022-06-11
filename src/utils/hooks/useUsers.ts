import { useEffect, useState } from 'react';
import { IReq } from '../../@types/fetch';
import { IPageInfo } from '../../@types/pagination';
import { IUser } from '../../@types/users';
import { API, URL } from '../constant';
import useAuthReq from './useReq';

const initPageInfo: IPageInfo = {
  limit: 10,
  offset: 0,
  total: 10,
  number: 0,
} as const;

const useUsers = () => {
  const { send } = useAuthReq('GET', `${API}${URL.USERS}`, null, {
    accept: 'application/json',
  });
  const [users, setUsers] = useState<IUser[] | null>(null);
  const [name, setName] = useState<string>('');
  const [page, setPage] = useState<IPageInfo>(initPageInfo);

  const update = (req: IReq = {}) => {
    send({ ...req })
      .then((data: Response) => data.json())
      .then((data) => {
        setUsers(data.users);
        setPage((prev) => ({ ...prev, ...data.page_info }));
      })
      .catch((e) => console.error(e));
  };

  const search = (input: string) => {
    update({
      url: `${API}${URL.USERS}?limit=${page.limit}&offset=0&username=${input}`,
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
      url: `${API}${URL.USERS}?limit=${page.limit}&offset=${shift}&username=${name}`,
    });
  };

  const changePageSize = (limit: number) => {
    setPage((prev) => ({
      ...prev,
      limit,
      number: 0,
    }));
    update({
      url: `${API}${URL.USERS}?limit=${limit}&offset=0&username=${name}`,
    });
  };

  useEffect(() => {
    update();
  }, []);

  return { users, page, changePage, changePageSize, search };
};

export default useUsers;
