import React, { useContext, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../@types/users";
import Breadcrumb from "../../components/Breadcrumb/breadcrumb";
import HeaderLogic from "../../components/Header/header.logic";
import Modal from "../../components/modal/Modal";
import { ModalTitle } from "../../components/modal/Modal.styled";
import TextInput from "../../components/SimpleInput/TextInput";
import { UserContext } from "../../context/userContext";
import {
  BtnPrimary,
  BtnSecondary,
  Col,
  Container,
  Key,
  Row,
  Tuple,
  Value,
  WarnText,
} from "../../styles/global.styled";
import { API, URL } from "../../utils/constant";
import useAuthReq from "../../utils/hooks/useReq";
import useUser from "../../utils/hooks/useUser";

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
      <HeaderLogic />
      <Breadcrumb />
      <Container>
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
          <BtnPrimary onClick={() => setEmailIsUpdate(true)}>
            Zmień emaila
          </BtnPrimary>
          <BtnPrimary onClick={() => setIsUpdate(true)}>Zmień hasło</BtnPrimary>
          <BtnSecondary onClick={() => setIsDeleting(true)}>
            Usuń profil
          </BtnSecondary>
        </Row>
      </Container>
      <Modal isOpen={isDeleting} onClose={() => setIsDeleting(false)}>
        <ModalTitle>Usuwanie konta</ModalTitle>
        <WarnText>Czy na pewno chcesz permanentnie usunąć konto?</WarnText>
        <Row margin="20px 0 0 0" justifyContent="center" gap="30px">
          <BtnSecondary onClick={() => handleRemove()}>TAK</BtnSecondary>
          <BtnPrimary onClick={() => setIsDeleting(false)}>NIE</BtnPrimary>
        </Row>
      </Modal>
      <Modal isOpen={isUpdate} onClose={() => setIsUpdate(false)}>
        <ModalTitle>Edycja konta</ModalTitle>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(submit)}>
            <TextInput
              name="password"
              title="Stare hasło"
              required
              type="password"
              placeholder="***"
            />
            <TextInput
              name="new_password"
              title="Nowe hasło"
              required
              type="password"
              placeholder="***"
            />
            <TextInput
              name="new_password_again"
              title="Nowe hasło ponownie"
              required
              type="password"
              placeholder="***"
            />
            {/* <Row justifyContent="center">
              <WarnText>{errors?.new_password_again?.message}</WarnText>
            </Row> */}
            <Row margin="20px 0 0 0" justifyContent="center" gap="30px">
              <BtnPrimary type="submit">Zaktualizuj</BtnPrimary>
              <BtnSecondary type="button" onClick={() => setIsUpdate(false)}>
                Wróć
              </BtnSecondary>
            </Row>
          </form>
        </FormProvider>
      </Modal>
      <Modal isOpen={emailIsUpdate} onClose={() => setEmailIsUpdate(false)}>
        <ModalTitle>Edycja konta</ModalTitle>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(submit)}>
            <TextInput
              name="email"
              title="Nowy email"
              required
              placeholder="alkohoLove@email.com"
            />
            {/* <Row justifyContent="center">
              <WarnText>{errors?.email?.message}</WarnText>
            </Row> */}
            <Row margin="20px 0 0 0" justifyContent="center" gap="30px">
              <BtnPrimary type="submit">Zaktualizuj</BtnPrimary>
              <BtnSecondary
                type="button"
                onClick={() => setEmailIsUpdate(false)}
              >
                Wróć
              </BtnSecondary>
            </Row>
          </form>
        </FormProvider>
      </Modal>
    </>
  );
};

export default Account;
