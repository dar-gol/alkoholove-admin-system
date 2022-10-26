import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IUser } from "../../@types/user";
import { Text } from "../../styles/global.styled";
import { API, URL, USER_ALCOHOLS_STATE } from "../../utils/constant";
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
  user: IUser;
  show: boolean;
  amountOfUserAlcohols: number;
  goToAccount: () => void;
  logout: () => void;
  getShouldToUserAlcohols: () => number;
  getTextUserAlcohols: () => string;
  getColorUserAlcohols: () => string;
}

const PopupView = ({
  logout,
  user,
  goToAccount,
  show,
  amountOfUserAlcohols,
  getShouldToUserAlcohols,
  getTextUserAlcohols,
  getColorUserAlcohols,
}: Props) => {
  const shouldToUserAlcohols = getShouldToUserAlcohols();

  return (
    <PopupContainer show={show}>
      <ArrowUp />
      <ProfilName>{user?.username}</ProfilName>
      <TextLine>
        Wprowadzonych alkoholi: {amountOfUserAlcohols} / {shouldToUserAlcohols}
      </TextLine>
      <Text
        type="body"
        weight="bold"
        size="small"
        color={getColorUserAlcohols()}
      >
        {getTextUserAlcohols()}
      </Text>
      <Line />
      <ALink target="_blank" href="http://docs.design.alkoholove.com.pl/">
        AlkohoLove UI
      </ALink>
      <BtnLink onClick={goToAccount}>Przejdź do profilu</BtnLink>
      <BtnLink onClick={logout}>Wyloguj się</BtnLink>
    </PopupContainer>
  );
};

export default PopupView;
