import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "styled-components";
import { IError } from "../../@types/errors";
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

interface Props {
  onCollapse?: () => void;
  collapse?: boolean;
}

const ErrorDetails = ({
  onCollapse = () => {},
  collapse = undefined,
}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { id } = useParams();
  const theme = useTheme() as { palette: { [k: string]: string } };
  const navigate = useNavigate();
  const [error, setError] = useState<IError | null>(null);
  const { send } = useAuthReq("GET", `${API}${URL.ERRORS}/${id}`, null, {
    accept: "application/json",
  });
  const getError = () => {
    send({})
      .then((data: Response) => data.json())
      .then((data: IError) => {
        setError(data);
      });
  };

  const remove = async () => {
    await send({ method: "DELETE" });
    navigate("/error");
  };

  useEffect(() => getError(), [id]);
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
            {error && (
              <Col>
                <Tuple>
                  <Key>Identyfikator zgłoszenia </Key>
                  <Value>{error.id}</Value>
                </Tuple>
                <Tuple>
                  <Key>Nazwa użytkownika </Key>
                  <Value>
                    <Text
                      as="a"
                      type="body"
                      weight="medium"
                      size="large"
                      href={`/user/${error.user_id}`}
                      color={theme.palette.Secondary70}
                    >
                      {error.username}
                    </Text>
                  </Value>
                </Tuple>
                <Tuple>
                  <Key>Opis błędu </Key>
                  <Value>{error.description}</Value>
                </Tuple>
              </Col>
            )}
            <Row justifyContent="flex-end" gap="20px" margin="20px 0 0 0">
              <BtnSecondary padding="0 20px" onClick={() => setIsOpen(true)}>
                Usuń zgłoszony błąd
              </BtnSecondary>
            </Row>
          </ScrollContent>
        </ListWrapper>
      </ListContainer>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalTitle>Usuwanie błędu</ModalTitle>
        <WarnText>Czy na pewno chcesz permanentnie usunąć ten błąd?</WarnText>
        <Col>
          <Tuple>
            <Key>ID</Key>
            <Value>{error?.id}</Value>
          </Tuple>
          <Tuple>
            <Key>Opis</Key>
            <Value>{error?.description}</Value>
          </Tuple>
        </Col>
        <Col margin="20px 0 0 0" justifyContent="center" gap="30px">
          <BtnSecondary onClick={() => remove()}>
            Tak, chcę permanentnie usunąć zgłoszony błąd.
          </BtnSecondary>
          <BtnPrimary onClick={() => setIsOpen(false)}>
            Nie, nie chcę permanentnie usunąć tego błędu.
          </BtnPrimary>
        </Col>
      </Modal>
    </>
  );
};

export default ErrorDetails;
