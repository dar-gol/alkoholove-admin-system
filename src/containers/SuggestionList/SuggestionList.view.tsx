import React, { useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Suggestion } from "../../@types/suggestions";
import { IUser } from "../../@types/users";
import Breadcrumb from "../../components/Breadcrumb/breadcrumb";
import HeaderLogic from "../../components/Header/header.logic";
import Indicator from "../../components/Indicator/Indicator";
import { TCell, Title, TRow, Value } from "../../components/List/List.styled";
import List, { IListHandlers } from "../../components/List/List.view";
import Pagination from "../../components/Pagination/pagination";
import Searcher from "../../components/Searcher/searcher";
import SuggestionDetails from "../SuggestionDetails/SuggestionDetails.view";
import {
  CapitalCase,
  Container,
  ContentContainer,
  ListContainer,
  ListTitle,
} from "../../styles/global.styled";
import { API, URL } from "../../utils/constant";
import withDashboardWrapper from "../../utils/hoc/withDashboardWrapper";
import useUsers from "../../utils/hooks/useUsers";
import { getDate } from "../../utils/utils";
import UserDetail from "../UserDetails/UserDetail.view";

const initReq = ["GET", API + URL.GET_SUGGESTIONS, ""] as const;
const width = document.body.clientWidth;

const SuggestionListView = () => {
  const { id } = useParams();
  const listRef = useRef<IListHandlers>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isSmallScreen = () => width < 1200 && !!id;
  const [collapse, setCollapse] = useState<boolean>(isSmallScreen());

  const onCollapse = () => {
    if (isSmallScreen()) {
      setCollapse(false);
      navigate(`/suggestion${location.search}`);
      return;
    }
    setCollapse((prev) => !prev);
  };

  const goToSuggestionDetails = (index?: string) => {
    setCollapse(width < 1200 && !!index);
    navigate(`/suggestion${index ? `/${index}` : ""}${location.search}`);
  };

  const refresh = () => {
    listRef.current?.refresh();
  };

  const drawContent = (content: Suggestion) => (
    <TRow
      key={content.id}
      role="link"
      tabIndex={0}
      onClick={() => goToSuggestionDetails(content.id)}
    >
      <TCell
        width="200px"
        padding="20px"
        data-label="Nazwa uzytkownika"
        verticalAlign="top"
      >
        <Title>Nazwa alkoholu</Title>
        <Value>{content.name}</Value>
      </TCell>
      <TCell
        width="100px"
        padding="20px"
        data-label="Email uzytkownika"
        verticalAlign="top"
      >
        <Title>Rodzaj</Title>
        <Value>{content.kind}</Value>
      </TCell>
      <TCell
        padding="20px"
        data-label="Data stworzenia konta"
        verticalAlign="top"
      >
        <Title>Kod kreskowy</Title>
        <Value>{content.barcode}</Value>
      </TCell>
    </TRow>
  );
  return (
    <>
      <ContentContainer>
        <ListContainer className={`${collapse ? "hidden" : ""}`}>
          <Indicator
            visible={!!id}
            size={50}
            top="50px"
            right="-25px"
            onClick={() => goToSuggestionDetails()}
            icon="icon-chevron-right"
            type="secondary"
          />
          <List
            isSearch={false}
            listObjectName="suggestions"
            ref={listRef}
            listTitle="Lista sugestii uzytkownikow"
            initReq={[...initReq]}
            contentRow={(content) => drawContent(content as Suggestion)}
          />
        </ListContainer>
        {id && (
          <SuggestionDetails
            collapse={collapse}
            onCollapse={onCollapse}
            refresh={refresh}
            closeDetails={() => goToSuggestionDetails()}
          />
        )}
      </ContentContainer>
    </>
  );
};

export default withDashboardWrapper(SuggestionListView);
