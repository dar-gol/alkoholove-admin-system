import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IUser } from "../../@types/users";
import Indicator from "../../components/Indicator/Indicator";
import {
  BtnSecondary,
  Col,
  Key,
  ListContainer,
  ListTitle,
  ListWrapper,
  ScrollContent,
  Tuple,
  Value,
} from "../../styles/global.styled";
import { API, URL } from "../../utils/constant";
import useAuthReq from "../../utils/hooks/useReq";
import { getDate } from "../../utils/utils";

interface Props {
  onCollapse?: () => void;
  collapse?: boolean;
}

const UserDetail = ({ onCollapse = () => {}, collapse = undefined }: Props) => {
  const { id } = useParams();
  const [user, setUser] = useState<IUser | null>(null);
  const { send } = useAuthReq("GET", `${API}${URL.USERS}/${id}`, null, {
    accept: "application/json",
  });
  const getUser = () => {
    send({})
      .then((data: Response) => data.json())
      .then((data: IUser) => {
        setUser(data);
      });
  };

  const handleBan = () => {
    send({
      method: "PUT",
      url: `${API}${URL.USERS}/${id}?to_ban=${!user?.is_banned}`,
    }).then(() => getUser());
  };

  useEffect(() => getUser(), [id]);
  return (
    <ListContainer>
      <Indicator
        visible={collapse !== undefined}
        size={50}
        top="10px"
        left="-25px"
        onClick={onCollapse}
        icon={`icon-chevron-${collapse ? "right" : "left"}`}
        type="secondary"
      />
      <ListWrapper>
        <ListTitle>Informacje o uzytkowniku: {user && user.username}</ListTitle>
        <ScrollContent padding="0 30px">
          {user && (
            <Col>
              <Tuple>
                <Key>Nazwa użytkownika </Key>
                <Value>{user.username}</Value>
              </Tuple>
              <Tuple>
                <Key>Email </Key>
                <Value>{user.email}</Value>
              </Tuple>
              <Tuple>
                <Key>ID użytkownika </Key>
                <Value>{user.id}</Value>
              </Tuple>
              <Tuple>
                <Key>Zbanowany </Key>
                <Value>{user.is_banned ? "TAK" : "NIE"}</Value>
              </Tuple>
              <Tuple>
                <Key>Admin </Key>
                <Value>{user.is_admin ? "TAK" : "NIE"}</Value>
              </Tuple>
              <Tuple>
                <Key>Ostatnie logowanie </Key>
                <Value>{getDate(user.last_login)}</Value>
              </Tuple>
              <Tuple>
                <Key>Data stworzenia konta</Key>
                <Value>{getDate(user.created_on)}</Value>
              </Tuple>
            </Col>
          )}
          <BtnSecondary onClick={handleBan}>
            {user && user.is_banned ? "Odbanuj" : "Zbanuj"} użytkownika
          </BtnSecondary>
        </ScrollContent>
      </ListWrapper>
    </ListContainer>
  );
};

export default UserDetail;
