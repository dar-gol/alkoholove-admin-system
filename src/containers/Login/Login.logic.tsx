import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Action, State, Type } from "../../utils/reducers/LoginReducer";
import LoginView from "./Login.view";

const defaultValues = {
  username: "",
  password: "",
};

interface Props {
  onSubmit: SubmitHandler<FieldValues>;
  dispatch: React.Dispatch<Action>;
  state: State;
}

const LoginLogic = ({ onSubmit, dispatch, state }: Props) => {
  const [cookie, setCookie] = useCookies();
  const [isNight, setIsNight] = useState<boolean>(false);
  const form = useForm({ defaultValues });

  useEffect(() => {
    setIsNight(cookie.mode === "dark");
  }, []);

  const cleanForm = () => {
    dispatch({ type: Type.LOGIN_CLEAN });
    form.reset({ username: "", password: "" });
  };

  const modeHandler = () => {
    setIsNight((prev) => !prev);
    setCookie("mode", isNight ? "light" : "dark", {
      path: "/",
      sameSite: "strict",
    });
  };

  return (
    <LoginView
      isNight={isNight}
      modeHandler={modeHandler}
      form={form}
      onSubmit={onSubmit}
      cleanForm={cleanForm}
      state={state}
    />
  );
};

export default LoginLogic;
