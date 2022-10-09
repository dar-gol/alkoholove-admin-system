import React from "react";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import { useTheme } from "styled-components";
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
import ErrorModal from "../../components/ErrorModal/errorModal";
import TextInput from "../../components/Inputs/TextInput";
import { BtnPrimary, Col, Row } from "../../styles/global.styled";
import CheckBox from "../../components/Inputs/CheckBox";
import LoadingModal from "../../components/modal/LoadingModal";
import useLogin from "../../utils/hooks/useLogin";
import { State } from "./Login.reducer";

interface Props {
  isNight: boolean;
  modeHandler: () => void;
  form: UseFormReturn<{ username: string; password: string }>;
  onSubmit: SubmitHandler<FieldValues>;
  cleanForm: () => void;
  state: State;
}

const LoginView = ({
  isNight,
  modeHandler,
  form,
  onSubmit,
  cleanForm,
  state,
}: Props) => {
  const theme = useTheme() as { palette: { [k: string]: string } };
  return (
    <Container>
      <DayNightContainer>
        <CheckBox
          leftIcon="icon-sun"
          leftColor={theme.palette.Yellow70}
          rightIcon="icon-night"
          rightColor={theme.palette.Grey50}
          value={isNight}
          onClick={modeHandler}
        />
      </DayNightContainer>
      <Col gap={`${Spacings.s3}px`} justifyContent="center" alignItems="center">
        <LogoWrapper>
          <Logo src="./logo192.png" alt="This is a alkohoLove's logo" />
        </LogoWrapper>
        <Form onSubmit={form.handleSubmit(onSubmit)}>
          <Row>
            <Title>Panel administracyjny</Title>
          </Row>
          <Row>
            <SubTitle>Zaloguj się</SubTitle>
          </Row>
          <Row width="100%">
            <Controller
              control={form.control}
              name="username"
              rules={{ required: true }}
              render={({ field }) => (
                <TextInput
                  value={field.value}
                  onChange={field.onChange}
                  inputRef={field.ref}
                  icon="icon-Profil"
                  title="Nazwa użytkownika"
                  placeholder="User123"
                  error="Nazwa uzytkownika jest wymagana"
                  state={form.formState.errors.username ? "error" : ""}
                  isAutoCompleted
                />
              )}
            />
          </Row>
          <Row width="100%">
            <Controller
              control={form.control}
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
                  title="Hasło"
                  placeholder="**********"
                  error="Hasło jest nieprawidłowe!"
                  state={form.formState.errors.password ? "error" : ""}
                  type="password"
                  autoComplete="on"
                  isAutoCompleted
                />
              )}
            />
          </Row>
          <Row justifyContent="center">
            <BtnPrimary type="submit" width="150px">
              Zaloguj się
            </BtnPrimary>
          </Row>
        </Form>
        <ForgottenPassword href="#">Nie pamiętasz hasła?</ForgottenPassword>
      </Col>
      <ErrorModal
        isOpen={!!state.error}
        title="Problem z logowaniem"
        text="Upewnij się, że wpisałeś poprawne dane logowania"
        details={state.error}
        onClose={cleanForm}
      />
      <LoadingModal
        isOpen={state.loading}
        title="Proszę czekać trwa logowanie do systemu"
      />
    </Container>
  );
};

export default LoginView;
