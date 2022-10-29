import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Action, State, Type } from "./Login.reducer";
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
  const [isContrast, setIsContrast] = useState<boolean>(false);
  const form = useForm({ defaultValues });

  useEffect(() => {
    setIsNight(cookie.mode === "dark");
    setIsContrast(cookie.isHighContrast === "true");
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

  const contrastModeHandler = () => {
    setIsContrast((prev) => !prev);
    setCookie("isHighContrast", !isContrast ? "true" : "false", {
      path: "/",
      sameSite: "strict",
    });
  };

  return (
    <LoginView
      isNight={isNight}
      isContrast={isContrast}
      modeHandler={modeHandler}
      contrastModeHandler={contrastModeHandler}
      form={form}
      onSubmit={onSubmit}
      cleanForm={cleanForm}
      state={state}
    />
  );
};

export default LoginLogic;
