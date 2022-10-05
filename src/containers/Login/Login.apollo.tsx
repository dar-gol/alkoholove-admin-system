import React from "react";
import useLogin from "../../utils/hooks/useLogin";
import LoginLogic from "./Login.logic";

const LoginApollo = () => {
  const { loginHandler, dispatch, state } = useLogin();
  const handleSubmit = async ({ username, password }: any) =>
    loginHandler(username, password);

  return (
    <LoginLogic onSubmit={handleSubmit} dispatch={dispatch} state={state} />
  );
};

export default LoginApollo;
