import React, { useRef } from "react";
import { TCell, Title, TRow, Value } from "../../components/List/List.styled";
import List, { IListHandlers } from "../../components/List/List.view";
import {
  CapitalCase,
  Col,
  ContentContainer,
  ListContainer,
  Row,
} from "../../styles/global.styled";
import { API, URL } from "../../utils/constant";
import withDashboardWrapper from "../../utils/hoc/withDashboardWrapper";
import { IError } from "../../@types/errors";

const initReq = ["GET", `${API}${URL.ERRORS}`, ""] as const;

const ErrorListView = () => {
  const listRef = useRef(null);

  const drawContent = (content: IError) => (
    <TRow key={content.id} role="link" tabIndex={0} pointerEvents="none">
      <TCell padding="20px" data-label="Nazwa kategorii" verticalAlign="top">
        <Title>Nazwa uytkownika</Title>
        <Value>{content.user_id}</Value>
      </TCell>
      <TCell padding="20px" data-label="Dodatkowe właściwości">
        <Title>Opis błędu</Title>
        <Value>{content.description}</Value>
      </TCell>
    </TRow>
  );
  return (
    <ContentContainer>
      <ListContainer>
        <List
          isSearch={false}
          listObjectName="reported_errors"
          ref={listRef}
          listTitle="Lista zgłoszonych błędów"
          initReq={[...initReq]}
          contentRow={(content) => drawContent(content as IError)}
        />
      </ListContainer>
    </ContentContainer>
  );
};

export default withDashboardWrapper(ErrorListView);
