import React, { useReducer, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Tokens } from "../../@types/user";
import {
  INITIAL_LOGIN_STATE,
  loginReducer,
  Type,
} from "../reducers/LoginReducer";
import { API, URL } from "../constant";
import { post, postForm } from "../fetch";
import useUser from "./useUser";

const useLogin = () => {
  const { set, checkCookie, get, remove } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [state, dispatch] = useReducer(loginReducer, INITIAL_LOGIN_STATE);
  const checkLogin = () =>
    new Promise((resolve, reject) => {
      if (checkCookie()) resolve(true);
      else reject(new Error("You don't have cookie"));
    })
      .then(() => {
        set(get());
        if (location.pathname === "/") navigate("home");
      })
      .catch(() => {
        if (location.pathname !== "/") navigate("/");
      });
  const loginHandler = (username: string, password: string) => {
    dispatch({ type: Type.LOGIN_START });
    return postForm({
      url: `${API}${URL.LOGIN}`,
      body: { username, password },
    })
      .then((data: Tokens) => {
        if (!data?.access_token) throw data;
        set({
          access_token: `${data.access_token}`,
          refresh_token: `${data.refresh_token}`,
        });
        navigate("home");
      })
      .catch((e) => {
        const detail =
          typeof e?.detail === "object"
            ? "Problem with reading error, propably wrong login details"
            : (e?.detail as string);
        dispatch({
          type: Type.LOGIN_ERROR,
          payload: {
            error: detail,
          },
        });
      });
  };
  const logout = async () => {
    dispatch({ type: Type.LOGIN_START });
    await post({
      url: `${API}${URL.LOGOUT}`,
      header: {
        Authorization: `Bearer ${get().access_token}`,
        "authorization-refresh": `${get().refresh_token}`,
      },
      body: "",
    });
    remove();
    navigate("/");
  };
  return {
    loginHandler,
    checkLogin,
    logout,
    state,
    dispatch,
  };
};

export default useLogin;
