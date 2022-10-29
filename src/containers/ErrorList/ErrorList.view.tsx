import React, { useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
import ErrorDetails from "../ErrorDetails/ErrorDetails";
import Indicator from "../../components/Indicator/Indicator";

const initReq = ["GET", `${API}${URL.ERRORS}`, ""] as const;
const width = document.body.clientWidth;

const ErrorListView = () => {
  const { id } = useParams();
  const listRef = useRef<IListHandlers>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isSmallScreen = () => width < 1200 && !!id;
  const [collapse, setCollapse] = useState<boolean>(isSmallScreen());

  const goToErrorDetails = (index?: string) => {
    setCollapse(width < 1200);
    navigate(`/error/${index ? `${index}` : ""}${location.search}`);
  };

  const onCollapse = () => {
    if (isSmallScreen()) {
      setCollapse(false);
      navigate(`/error${location.search}`);
      return;
    }
    setCollapse((prev) => !prev);
  };

  const refresh = () => {
    listRef.current?.refresh();
  };

  const drawContent = (content: IError) => (
    <TRow
      key={content.id}
      role="link"
      tabIndex={0}
      onClick={() => goToErrorDetails(content.id)}
    >
      <TCell padding="20px" data-label="Nazwa kategorii" verticalAlign="top">
        <Title>Nazwa uytkownika</Title>
        <Value>{content.user_id}</Value>
      </TCell>
      <TCell padding="20px" data-label="Dodatkowe właściwości">
        <Title>Opis błędu</Title>
        <Value maxWidth="300px">{content.description}</Value>
      </TCell>
    </TRow>
  );
  return (
    <ContentContainer>
      <ListContainer className={`${collapse ? "hidden" : ""}`}>
        <Indicator
          visible={!!id}
          size={50}
          top="50px"
          right="-25px"
          onClick={() => goToErrorDetails()}
          icon="icon-chevron-right"
          type="secondary"
        />
        <List
          isSearch={false}
          listObjectName="reported_errors"
          ref={listRef}
          listTitle="Lista zgłoszonych błędów"
          initReq={[...initReq]}
          contentRow={(content) => drawContent(content as IError)}
        />
      </ListContainer>
      {id && (
        <ErrorDetails
          collapse={collapse}
          onCollapse={onCollapse}
          closeDetails={() => goToErrorDetails()}
          refresh={refresh}
        />
      )}
    </ContentContainer>
  );
};

export default withDashboardWrapper(ErrorListView);
