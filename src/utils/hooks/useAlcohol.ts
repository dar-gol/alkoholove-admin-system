import { useState, useEffect, useContext } from "react";
import { UserContextType } from "../../@types/user";
import { UserContext } from "../../context/userContext";
import { IAlcohol } from "../../@types/alcohol";
import { API, URL } from "../constant";
import { get } from "../fetch";

const useAlcohol = (barcode: string | undefined) => {
  const { user } = useContext(UserContext) as UserContextType;
  const [alcohol, setAlcohol] = useState<IAlcohol | null>(null);

  useEffect(() => {
    if (!barcode) return;
    get({
      url: `${API}${URL.GET_ALCOHOL}/${barcode}`,
      header: {
        Authorization: `Bearer ${user.access_token}`,
      },
    })
      .then((data) => {
        if (data.ok) return data.json();
        throw data;
      })
      .then((data) => {
        setAlcohol(data);
      })
      .catch((e) => console.log({ e }));
  }, [barcode]);

  return alcohol;
};

export default useAlcohol;
