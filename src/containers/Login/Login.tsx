import React, { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import { Controller, useForm, useFormState } from "react-hook-form";
import { useCookies } from "react-cookie";
import {
  Container,
  Logo,
  LogoWrapper,
  SubTitle,
  Title,
  Form,
  ForgottenPassword,
  DayNightContainer,
} from "./Login.styled";
import Spacings from "../../styles/spacings";
import useLogin from "../../utils/hooks/useLogin";
import ErrorModal from "../../components/ErrorModal/errorModal";
import Modal from "../../components/modal/Modal";
import { ModalTitle } from "../../components/modal/Modal.styled";
import Loader from "../../components/Loader/loader";
import TextInput from "../../components/Inputs/TextInput";
import { Type } from "../../utils/reducers/LoginReducer";
import { BtnPrimary, Col, Row } from "../../styles/global.styled";
import CheckBox from "../../components/Inputs/CheckBox";
import LoadingModal from "../../components/modal/LoadingModal";

const Login = () => {
  const { loginHandler, dispatch, state } = useLogin();
  const theme = useTheme() as { palette: { [k: string]: string } };
  const [cookie, setCookie] = useCookies();
  const [isNight, setIsNight] = useState<boolean>(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const login = ({ username, password }: any) =>
    loginHandler(username, password);

  useEffect(() => {
    setIsNight(cookie.mode === "dark");
  }, []);

  const clean = () => {
    dispatch({ type: Type.LOGIN_CLEAN });
    reset({ username: "", password: "" });
  };

  const modeHandler = () => {
    setIsNight((prev) => !prev);
    setCookie("mode", isNight ? "light" : "dark", {
      path: "/",
      sameSite: "strict",
    });
  };
  return (
    <Container>
      <DayNightContainer>
        <CheckBox
          error="asd"
          placeholder="asd"
          leftIcon="icon-sun"
          leftColor={theme.palette.Yellow70}
          rightIcon="icon-night"
          rightColor={theme.palette.Grey50}
          isActive={isNight}
          onClick={modeHandler}
        />
      </DayNightContainer>
      <Col gap={`${Spacings.s3}px`} justifyContent="center" alignItems="center">
        <LogoWrapper>
          <Logo src="./logo192.png" alt="This is a alkohoLove's logo" />
        </LogoWrapper>
        <Form onSubmit={handleSubmit(login)}>
          <Row>
            <Title>Panel administracyjny</Title>
          </Row>
          <Row>
            <SubTitle>Zaloguj się</SubTitle>
          </Row>
          <Row width="100%">
            <Controller
              control={control}
              name="username"
              rules={{ required: true }}
              render={({ field }) => (
                <TextInput
                  value={field.value}
                  onChange={field.onChange}
                  icon="icon-Profil"
                  inputRef={field.ref}
                  placeholder="Nazwa uzytkownika"
                  error="Nazwa uzytkownika jest wymagana"
                  state={errors.username ? "error" : ""}
                />
              )}
            />
          </Row>
          <Row width="100%">
            <Controller
              control={control}
              name="password"
              rules={{
                minLength: 8,
                required: true,
              }}
              render={({ field }) => (
                <TextInput
                  value={field.value}
                  onChange={field.onChange}
                  icon="icon-Password"
                  inputRef={field.ref}
                  placeholder="Hasło"
                  error="Hasło jest nieprawidłowe!"
                  state={errors.password ? "error" : ""}
                  type="password"
                  autoComplete="on"
                />
              )}
            />
          </Row>
          <Row justifyContent="center">
            <BtnPrimary type="submit">Zaloguj się</BtnPrimary>
          </Row>
        </Form>
        <ForgottenPassword href="#">Nie pamiętasz hasła?</ForgottenPassword>
      </Col>
      <ErrorModal
        isOpen={!!state.error}
        title="Problem z logowaniem"
        text="Upewnij się, że wpisałeś poprawne dane logowania"
        details={state.error}
        onClose={clean}
      />
      <LoadingModal
        isOpen={state.loading}
        title="Proszę czekać trwa logowanie do systemu"
      />
    </Container>
  );
};

export default Login;
