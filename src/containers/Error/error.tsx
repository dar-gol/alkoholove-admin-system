import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IError } from "../../@types/errors";
import { IUser } from "../../@types/users";
import Breadcrumb from "../../components/Breadcrumb/breadcrumb";
import ErrorModal from "../../components/ErrorModal/errorModal";
import HeaderLogic from "../../components/Header/header.logic";
import Modal from "../../components/modal/Modal";
import { ModalTitle } from "../../components/modal/Modal.styled";
import {
  BtnPrimary,
  BtnSecondary,
  Col,
  Container,
  CriticalBar,
  Key,
  Row,
  Title,
  Tuple,
  Value,
  WarnText,
} from "../../styles/global.styled";
import { API, URL } from "../../utils/constant";
import useAuthReq from "../../utils/hooks/useReq";

const Error = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState<IError | null>(null);
  const [user, setUser] = useState<IUser | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [errorModal, setErrorModal] = useState<string>("");
  const { send } = useAuthReq("GET", `${API}${URL.ERRORS}/${id}`, null, {
    Accept: "application/json",
  });

  const remove = async () => {
    try {
      await send({ method: "DELETE", url: `${API}${URL.ERRORS}/${id}` });
      navigate("/errors");
    } catch (e: any) {
      setErrorModal(JSON.stringify(e?.statusText));
    }
  };

  const getData = async () => {
    const result: IError = await send({}).then((data) => data.json());

    setError(result);

    const userResult: IUser = await send({
      url: `${API}${URL.USERS}/${result.user_id}`,
    }).then((data) => data.json());

    setUser(userResult);
  };

  useEffect(() => {
    getData();
  }, []);

  const ErrorBlock = user && error && (
    <>
      <Tuple>
        <Key>ID</Key>
        <Value>{error.id}</Value>
      </Tuple>
      <Tuple>
        <Key>Opis</Key>
        <Value>{error.description}</Value>
      </Tuple>
      <Tuple>
        <Key>Zgłoszone przez</Key>
        <Value>
          <Link to={`/users/${user.id}`}>{user.username}</Link>
        </Value>
      </Tuple>
      <Tuple>
        <Key>Zbanowana (Osoba zgłaszająca)</Key>
        <Value>{user.is_banned ? "TAK" : "NIE"}</Value>
      </Tuple>
    </>
  );

  return (
    <>
      <HeaderLogic />
      <Breadcrumb />
      <Container>
        <Title>Informację o błędzie</Title>
        {ErrorBlock}
        <Row justifyContent="flex-end" margin="20px 0 0 0">
          <BtnPrimary onClick={() => setIsOpen(true)}>
            Usuń zgłoszenie
          </BtnPrimary>
        </Row>
      </Container>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalTitle>Usuwanie zgłoszenia</ModalTitle>
        <WarnText>
          Czy na pewno chcesz permanentnie usunąć te zgłoszenie?
        </WarnText>
        <Col>
          <Tuple>
            <Key>ID</Key>
            <Value>{error?.id}</Value>
          </Tuple>
          <Tuple>
            <Key>Osoba zgłaszająca</Key>
            <Value>{user?.username}</Value>
          </Tuple>
        </Col>
        <Row margin="20px 0 0 0" justifyContent="center" gap="30px">
          <BtnSecondary onClick={() => remove()}>TAK</BtnSecondary>
          <BtnPrimary onClick={() => setIsOpen(false)}>NIE</BtnPrimary>
        </Row>
      </Modal>
      <ErrorModal
        isOpen={!!errorModal}
        title="Problem z usunięciem zgłoszenia"
        details={errorModal}
        onClose={() => setErrorModal("")}
      >
        <CriticalBar>
          <span className="icon-Error" />
          <p>
            Wystąpił problem z usunięciem zgłoszenia. Prawdopobnie takie
            zgłoszenie nie istnieje.
          </p>
        </CriticalBar>
      </ErrorModal>
    </>
  );
};

export default Error;
