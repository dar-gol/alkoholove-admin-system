import React, { useContext, useEffect, useState } from "react";
import { withCookies } from "react-cookie";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../@types/users";
import Breadcrumb from "../../components/Breadcrumb/breadcrumb";
import HeaderLogic from "../../components/Header/header.logic";
import InputFactory from "../../components/InputFactory/inputFactory";
import TextInput from "../../components/Inputs/TextInput";
import Modal from "../../components/modal/Modal";
import { ModalTitle } from "../../components/modal/Modal.styled";
import { UserContext } from "../../context/userContext";
import {
  BtnPrimary,
  BtnSecondary,
  Col,
  Container,
  Content,
  Key,
  Row,
  ScrollContent,
  Tuple,
  Value,
  WarnText,
} from "../../styles/global.styled";
import { API, URL } from "../../utils/constant";
import withDashboardWrapper from "../../utils/hoc/withDashboardWrapper";
import useAuthReq from "../../utils/hooks/useReq";
import useUser from "../../utils/hooks/useUser";
import { Title } from "../AddAlcohol/addAlcohol.styled";
import { Form } from "./account.styled";

const Account = () => {
  const methods = useForm({});
  const { errors } = methods.formState;
  const [me, setMe] = useState<IUser | null>(null);
  const { remove } = useUser();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [emailIsUpdate, setEmailIsUpdate] = useState<boolean>(false);
  const { send } = useAuthReq("GET", `${API}${URL.ME}`, null, {
    Accept: "application/json",
    "Content-Type": "application/json",
  });

  const handleRemove = async () => {
    await send({ method: "DELETE" });
    remove();
    navigate("/");
  };

  const update = async () => {
    send({})
      .then((data) => data.json())
      .then((data: IUser) => setMe(data));
  };

  const submit = async (data: any) => {
    const { new_password, new_password_again } = data;

    if (new_password !== new_password_again) {
      methods.setError("new_password_again", {
        type: "custom",
        message: "Hasła nie sa takie same!",
      });
      return;
    }

    try {
      await send({
        method: "PUT",
        body: JSON.stringify({
          ...data,
        }),
      });
      await update();
    } catch (e) {
      const field = emailIsUpdate ? "email" : "new_password_again";
      const text = emailIsUpdate
        ? "Wpisz poprawny email"
        : "Hasło powinno zawierac duza litere, cyfre oraz 8 znakow.";
      methods.setError(field, {
        type: "custom",
        message: text,
      });
      return;
    }

    setEmailIsUpdate(false);
    setIsUpdate(false);
  };

  useEffect(() => {
    update();
  }, []);

  return (
    <>
      <Content flex="1" width="100%" maxWidth="756px" gap="20px">
        <Title>Informacje o koncie</Title>
        <ScrollContent padding="0 20px 20px 20px">
          <Tuple>
            <Key>ID</Key>
            <Value>{me?.id}</Value>
          </Tuple>
          <Tuple>
            <Key>Nazwa użytkownika</Key>
            <Value>{me?.username}</Value>
          </Tuple>
          <Tuple>
            <Key>Email</Key>
            <Value>{me?.email}</Value>
          </Tuple>
          <Row margin="20px 0 0 0" justifyContent="flex-end" gap="20px">
            <BtnPrimary onClick={() => setEmailIsUpdate(true)} width="160px">
              Zmień emaila
            </BtnPrimary>
            <BtnPrimary onClick={() => setIsUpdate(true)} width="160px">
              Zmień hasło
            </BtnPrimary>
            <BtnSecondary onClick={() => setIsDeleting(true)} width="160px">
              Usuń profil
            </BtnSecondary>
          </Row>
        </ScrollContent>
      </Content>
      <Modal isOpen={isDeleting} onClose={() => setIsDeleting(false)}>
        <ModalTitle>Usuwanie konta</ModalTitle>
        <WarnText>Czy na pewno chcesz permanentnie usunąć konto?</WarnText>
        <Col margin="20px 0 0 0" justifyContent="center" gap="30px">
          <BtnSecondary onClick={() => handleRemove()}>
            Tak, chcę permanentnie usunąć konto.
          </BtnSecondary>
          <BtnPrimary onClick={() => setIsDeleting(false)}>
            Nie, nie chcę usunąć permanentnie konta.
          </BtnPrimary>
        </Col>
      </Modal>
      <Modal isOpen={isUpdate} onClose={() => setIsUpdate(false)}>
        <ModalTitle>Edycja konta</ModalTitle>
        <Row>
          <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(submit)}>
              <Col
                margin="0 0 20px 0"
                minHeight="56px"
                key="asdasfsdfsddsfsdfsdfsdfkiasdasdasdnd"
              >
                <Controller
                  name="password"
                  control={methods.control}
                  render={({ field }) => (
                    <InputFactory
                      value={field.value}
                      onChange={field.onChange}
                      inputRef={field.ref}
                      type="string"
                      name="password"
                      title="Stare hasło"
                      required
                      placeholder="********"
                    />
                  )}
                />
              </Col>
              <Col margin="0 0 20px 0" minHeight="56px">
                <Controller
                  name="new_password"
                  control={methods.control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextInput
                      {...field}
                      state=""
                      error=""
                      title="Nowe hasło"
                      placeholder="********"
                    />
                  )}
                />
              </Col>
              <Col margin="0 0 20px 0" minHeight="56px">
                <Controller
                  name="new_password_again"
                  control={methods.control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextInput
                      {...field}
                      state=""
                      error=""
                      title="Nowe hasło ponownie"
                      placeholder="********"
                    />
                  )}
                />
              </Col>
              <Row margin="20px 0 0 0" justifyContent="center" gap="30px">
                <BtnPrimary padding="0 20px" type="submit">
                  Zmień hasło
                </BtnPrimary>
                <BtnSecondary
                  padding="0 20px"
                  type="button"
                  onClick={() => setIsUpdate(false)}
                >
                  Zamknij okno
                </BtnSecondary>
              </Row>
            </Form>
          </FormProvider>
        </Row>
      </Modal>
      <Modal isOpen={emailIsUpdate} onClose={() => setEmailIsUpdate(false)}>
        <ModalTitle>Edycja konta</ModalTitle>
        <Row>
          <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(submit)}>
              <Col margin="0 0 20px 0" minHeight="56px">
                <Controller
                  name="email"
                  control={methods.control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextInput
                      {...field}
                      state=""
                      error=""
                      placeholder="nowy_email@domena.pl"
                      title="Nowy email"
                    />
                  )}
                />
              </Col>
              <Row margin="20px 0 0 0" justifyContent="center" gap="30px">
                <BtnPrimary padding="0 20px" type="submit">
                  Zmień email
                </BtnPrimary>
                <BtnSecondary
                  padding="0 20px"
                  type="button"
                  onClick={() => setEmailIsUpdate(false)}
                >
                  Zamknij okno
                </BtnSecondary>
              </Row>
            </Form>
          </FormProvider>
        </Row>
      </Modal>
    </>
  );
};

export default withDashboardWrapper(Account);
