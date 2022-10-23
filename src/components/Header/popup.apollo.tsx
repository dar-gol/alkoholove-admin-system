import React, { useEffect, useState } from "react";
import { Alcohols, AlcoholsObject, IAlcohol } from "../../@types/alcohol";
import { IUser } from "../../@types/user";
import { API, URL } from "../../utils/constant";
import useAuthReq from "../../utils/hooks/useReq";
import PopupLogic from "./popup.logic";

interface Props {
  show: boolean;
  logout: () => void;
}

const PopupApollo = ({ logout, show }: Props) => {
  const [me, setMe] = useState<IUser | null>(null);
  const [amountOfUserAlcohols, setAmountOfUserAlcohols] = useState<number>(0);
  const { send } = useAuthReq("GET", `${API}${URL.ME}`, null, {
    Accept: "application/json",
    "Content-Type": "application/json",
  });

  const update = () => {
    send({})
      .then((data) => data.json())
      .then((data: IUser) => setMe(data));
  };

  const getAlcohols = () =>
    send({ method: "POST", url: `${API}${URL.GET_ALCOHOL}?limit=0` }).then(
      (data) => data.json()
    ) as Promise<AlcoholsObject>;

  const getAmountOfUserAlcohol = (alcohols: Alcohols) => {
    const t = 0;
    return alcohols.reduce<number>((prev, curr) => {
      if (curr.username === me?.username) return prev + 1;
      return prev;
    }, 0);
  };

  const init = async () => {
    const data = await getAlcohols();
    if (!data.alcohols) return;
    const amount = getAmountOfUserAlcohol(data.alcohols);
    setAmountOfUserAlcohols(amount);
  };

  useEffect(() => {
    if (me) init();
  }, [me]);

  useEffect(() => {
    update();
  }, []);

  if (!show || !me) return null;

  return (
    <PopupLogic
      user={me}
      logout={logout}
      show={show}
      amountOfUserAlcohols={amountOfUserAlcohols}
    />
  );
};

export default PopupApollo;
