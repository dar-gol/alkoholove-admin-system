import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IUser } from "../../@types/users";
import Breadcrumb from "../../components/Breadcrumb/breadcrumb";
import HeaderLogic from "../../components/Header/header.logic";
import {
  BtnPrimary,
  Col,
  Container,
  Key,
  Row,
  Title,
  Tuple,
  Value,
} from "../../styles/global.styled";
import { API, URL } from "../../utils/constant";
import useAuthReq from "../../utils/hooks/useReq";
import { BtnBan } from "./user.styled";

const User = () => {
  const { id } = useParams();
  const [user, setUser] = useState<IUser | null>(null);
  const { send } = useAuthReq("GET", `${API}${URL.USERS}/${id}`, null, {
    accept: "application/json",
  });

  const getUser = () => {
    send({})
      .then((data) => data.json())
      .then((data) => {
        setUser(data);
      });
  };

  const handleBan = () => {
    send({
      method: "PUT",
      url: `${API}${URL.USERS}/${id}?to_ban=${!user?.is_banned}`,
    }).then(() => getUser());
  };

  useEffect(() => getUser(), []);

  return (
    <>
      <HeaderLogic />
      <Breadcrumb />
      {user && (
        <Container>
          <Title>Informacje o uzytkowniku: {user.username}</Title>
          <Col>
            <Tuple>
              <Key>Nazwa użytkownika: </Key>
              <Value>{user.username}</Value>
            </Tuple>
            <Tuple>
              <Key>Email: </Key>
              <Value>{user.email}</Value>
            </Tuple>
            <Tuple>
              <Key>ID użytkownika: </Key>
              <Value>{user.id}</Value>
            </Tuple>
            <Tuple>
              <Key>Zbanowany: </Key>
              <Value>{user.is_banned ? "TAK" : "NIE"}</Value>
            </Tuple>
            <Tuple>
              <Key>Admin: </Key>
              <Value>{user.is_admin ? "TAK" : "NIE"}</Value>
            </Tuple>
            <Tuple>
              <Key>Ostatnie logowanie: </Key>
              <Value>{user.last_login}</Value>
            </Tuple>
            <Tuple>
              <Key>Data stworzenia konta:</Key>
              <Value>{user.created_on}</Value>
            </Tuple>
          </Col>
          <Row justifyContent="flex-end" gap="20px" margin="30px 0 10px 0">
            {!user.is_admin && (
              <>
                <BtnPrimary>Przydziel uprawnienia administratorskie</BtnPrimary>
                <BtnBan onClick={handleBan}>
                  {user.is_banned ? "Odbanuj" : "Zbanuj"} użytkownika
                </BtnBan>
              </>
            )}
          </Row>
        </Container>
      )}
    </>
  );
};

export default User;
