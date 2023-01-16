/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTheme } from "styled-components";
import { Suggestion } from "../../@types/suggestions";
import { IUser } from "../../@types/users";
import Indicator from "../../components/Indicator/Indicator";
import Modal from "../../components/modal/Modal";
import { ModalTitle } from "../../components/modal/Modal.styled";
import {
  BtnPrimary,
  BtnSecondary,
  Col,
  Key,
  ListContainer,
  ListTitle,
  ListWrapper,
  Row,
  ScrollContent,
  Text,
  Tuple,
  Value,
  WarnText,
} from "../../styles/global.styled";
import { API, URL } from "../../utils/constant";
import useAuthReq from "../../utils/hooks/useReq";
import { createImageName, getDate } from "../../utils/utils";

interface Props {
  onCollapse?: () => void;
  collapse?: boolean;
  refresh: () => void;
  closeDetails: () => void;
}

const UserDetail = ({
  onCollapse = () => {},
  collapse = undefined,
  refresh,
  closeDetails,
}: Props) => {
  const theme = useTheme() as { palette: { [k: string]: string } };
  const { id } = useParams();
  const navigate = useNavigate();
  const [suggestionBlock, setSuggestionBlock] = useState<Suggestion | null>(
    null
  );
  const { send } = useAuthReq("GET", `${API}${URL.GET_SUGGESTIONS}/${id}`, "", {
    Accept: "application/json",
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const getSuggestion = () => {
    send({})
      .then((data: Response) => data.json())
      .then((data: Suggestion) => {
        setSuggestionBlock(data);
      });
  };

  const removeSuggestion = async () => {
    await send({
      method: "DELETE",
      url: `${API}${URL.GET_SUGGESTIONS}/${id}`,
    });
    refresh();
    closeDetails();
    setIsOpen(false);
  };

  const addSuggestion = () => {
    navigate(`/add/alcohol/?suggestion=${id}`);
  };

  const getUsers = (user_ids: string[], usernames: string[]) => {
    const links = usernames.map((username, index) => (
      <Text
        as="a"
        type="body"
        weight="medium"
        size="large"
        href={`/user/${user_ids[index]}`}
        color={theme.palette.Secondary70}
      >
        {username}
      </Text>
    ));
    return links;
  };

  useEffect(() => getSuggestion(), [id]);
  return (
    <>
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
          <ListTitle>Szczegółowe informacje</ListTitle>
          <ScrollContent padding="0 30px">
            {suggestionBlock && (
              <Col>
                <Row justifyContent="center">
                  <Col>
                    <img
                      height="600px"
                      src={`${URL.GET_USER_IMAGE}/${createImageName(
                        `${suggestionBlock.barcode}_${suggestionBlock.user_ids[0]}`
                      )}`}
                      onLoad={({ currentTarget }) => {
                        currentTarget.alt = "Zdjęcie przedstawiające alkohol";
                        currentTarget.height = 600;
                      }}
                      onError={({ currentTarget }) => {
                        currentTarget.alt = "";
                        currentTarget.height = 0;
                      }}
                      alt="Zdjęcie przedstawiające wybrany alkohol"
                    />
                  </Col>
                </Row>
                <Tuple>
                  <Key>Kod kreskowy </Key>
                  <Value>{suggestionBlock.barcode}</Value>
                </Tuple>
                <Tuple>
                  <Key>Rodzaj </Key>
                  <Value>{suggestionBlock.kind}</Value>
                </Tuple>
                <Tuple>
                  <Key>Nazwa alkoholu </Key>
                  <Value>{suggestionBlock.name}</Value>
                </Tuple>
                <Tuple>
                  <Key>ID sugestii </Key>
                  <Value>{suggestionBlock.id}</Value>
                </Tuple>
                <Tuple>
                  <Key>Utworzone przez </Key>
                  <Value>
                    {getUsers(
                      suggestionBlock.user_ids,
                      suggestionBlock.usernames
                    )}
                  </Value>
                </Tuple>
                <Tuple>
                  <Key>Opisu uzytkownikow </Key>
                  <Value>{suggestionBlock.descriptions.join(", ")}</Value>
                </Tuple>
              </Col>
            )}
            <Row justifyContent="end" gap="20px" margin="20px 0 0 0">
              <BtnSecondary onClick={() => setIsOpen(true)} width="200px">
                Usuń sugestie
              </BtnSecondary>
              <BtnPrimary onClick={addSuggestion} width="200px">
                Dodaj sugestię
              </BtnPrimary>
            </Row>
          </ScrollContent>
        </ListWrapper>
      </ListContainer>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalTitle>Usuwanie sugestii</ModalTitle>
        <WarnText>
          Czy na pewno chcesz permanentnie usunąć tę sugestię?
        </WarnText>
        <Col>
          <Tuple>
            <Key>Kod kreskowy</Key>
            <Value>{suggestionBlock?.barcode}</Value>
          </Tuple>
          <Tuple>
            <Key>Nazwa alkoholu</Key>
            <Value>{suggestionBlock?.name}</Value>
          </Tuple>
        </Col>
        <Col margin="20px 0 0 0" justifyContent="center" gap="30px">
          <BtnSecondary onClick={() => removeSuggestion()}>
            Tak, chcę permanentnie usunąć sugestię.
          </BtnSecondary>
          <BtnPrimary onClick={() => setIsOpen(false)}>
            Nie, nie chcę permanentnie usunąć sugestii.
          </BtnPrimary>
        </Col>
      </Modal>
    </>
  );
};

export default UserDetail;
