import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IUser } from "../../@types/user";
import { API, URL } from "../../utils/constant";
import useAuthReq from "../../utils/hooks/useReq";
import {
  PopupContainer,
  ProfilName,
  TextGreen,
  TextLine,
  ArrowUp,
  Line,
  BtnLink,
  ALink,
  TextRed,
} from "./header.styled";

interface Props {
  show: boolean;
  logout: () => void;
}

const Popup = ({ logout, show }: Props) => {
  const [me, setMe] = useState<IUser | null>(null);
  const navigate = useNavigate();
  const { send } = useAuthReq("GET", `${API}${URL.ME}`, null, {
    Accept: "application/json",
    "Content-Type": "application/json",
  });

  const update = async () => {
    send({})
      .then((data) => data.json())
      .then((data: IUser) => setMe(data));
  };

  useEffect(() => {
    update();
  }, []);
  return (
    <PopupContainer show={show}>
      <ArrowUp />
      <ProfilName>{me?.username || "-"}</ProfilName>
      <TextLine>Wprowadzonych alkoholi: 0</TextLine>
      <TextRed>Musisz Postarać się bardziej!</TextRed>
      <Line />
      <ALink target="_blank" href="http://docs.design.alkoholove.com.pl/">
        AlkohoLove UI
      </ALink>
      <BtnLink onClick={() => navigate("/account")}>Przejdź do profilu</BtnLink>
      <BtnLink onClick={logout}>Wyloguj się</BtnLink>
    </PopupContainer>
  );
};

export default Popup;
