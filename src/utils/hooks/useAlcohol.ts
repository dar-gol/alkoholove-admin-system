import { useState, useEffect, useContext } from 'react';
import { UserContextType } from '../../@types/user';
import { UserContext } from '../../context/userContext';
import { IAlcohol } from '../../@types/alcohol';
import { API } from '../constant';
import { get } from '../fetch';

const useAlcohol = (barcode: string) => {
  const { user } = useContext(UserContext) as UserContextType;
  const [alcohol, setAlcohol] = useState<IAlcohol | null>(null);

  useEffect(() => {
    get({
      url: `${API}/alcohols/${barcode}`,
      header: {
        Authorization: `Bearer ${user.access_token}`,
      },
    })
      .then((data) => data.json())
      .then((data) => setAlcohol(data));
  }, []);

  return alcohol;
};

export default useAlcohol;
