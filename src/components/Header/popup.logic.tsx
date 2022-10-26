import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "styled-components";
import { IUser } from "../../@types/user";
import { USER_ALCOHOLS_STATE, WEEK_USER_ALCOHOLS } from "../../utils/constant";
import PopupView from "./popup.view";

interface Props {
  show: boolean;
  amountOfUserAlcohols: number;
  user: IUser;
  logout: () => void;
}

const PopupLogic = ({ logout, user, show, amountOfUserAlcohols }: Props) => {
  const theme = useTheme() as { palette: { [k: string]: string } };
  const navigate = useNavigate();

  function weeksBetween() {
    const startDate = new Date(2022, 9, 2);
    const currentDate = new Date();
    return Math.round(
      (currentDate.getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000)
    );
  }

  const getShouldToUserAlcohols = () => weeksBetween() * WEEK_USER_ALCOHOLS;

  const getStateUserAlcohols = () => {
    const shouldToUserAlcohols = getShouldToUserAlcohols();
    if (
      amountOfUserAlcohols > shouldToUserAlcohols - WEEK_USER_ALCOHOLS &&
      amountOfUserAlcohols < shouldToUserAlcohols
    )
      return 1;
    if (amountOfUserAlcohols < shouldToUserAlcohols) return 0;
    if (amountOfUserAlcohols === shouldToUserAlcohols) return 2;
    if (amountOfUserAlcohols > shouldToUserAlcohols) return 3;
    return 0;
  };

  const getTextUserAlcohols = () => {
    const state = getStateUserAlcohols();
    return USER_ALCOHOLS_STATE[state];
  };

  const getColorUserAlcohols = () => {
    const state = getStateUserAlcohols();
    if (state === 0) return theme.palette.Red80;
    if (state === 1) return theme.palette.Yellow100;
    if (state === 2) return theme.palette.Green80;
    if (state === 3) return theme.palette.Green100;
    return theme.palette.Red80;
  };

  const goToAccount = () => navigate("/account");

  return (
    <PopupView
      logout={logout}
      user={user}
      goToAccount={goToAccount}
      show={show}
      amountOfUserAlcohols={amountOfUserAlcohols}
      getShouldToUserAlcohols={getShouldToUserAlcohols}
      getTextUserAlcohols={getTextUserAlcohols}
      getColorUserAlcohols={getColorUserAlcohols}
    />
  );
};

export default PopupLogic;
