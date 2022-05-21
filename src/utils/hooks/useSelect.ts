import { useState, useEffect, useContext } from 'react';
import { UserContextType } from '../../@types/user';
import { UserContext } from '../../context/userContext';
import { API } from '../constant';
import { get } from '../fetch';

const useSelect = (url: string | undefined) => {
  const { user } = useContext(UserContext) as UserContextType;
  const [data, setData] = useState(null);

  useEffect(() => {
    get({
      url: `${API}/${url}`,
      header: {
        Authorization: `Bearer ${user.access_token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);

  return data;
};

export default useSelect;
