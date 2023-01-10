import React, { useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Suggestion } from "../../@types/suggestions";
import { IUser } from "../../@types/users";
import Breadcrumb from "../Breadcrumb/breadcrumb";
import HeaderLogic from "../Header/header.logic";
import Indicator from "../Indicator/Indicator";
import { TCell, Title, TRow, Value } from "../List/List.styled";
import List from "../List/List.view";
import Pagination from "../Pagination/pagination";
import Searcher from "../Searcher/searcher";
import SuggestionDetails from "../../containers/SuggestionDetails/SuggestionDetails.view";
import {
  CapitalCase,
  Container,
  ContentContainer,
  ListContainer,
  ListTitle,
} from "../../styles/global.styled";
import { API, URL } from "../../utils/constant";
import { ListWrapper } from "./suggestion.styled";

const initReq = ["GET", API + URL.GET_SUGGESTIONS, ""] as const;
const width = document.body.clientWidth;

interface Props {
  goToSuggestion: (id: string) => void;
}

const SuggestionListView = ({ goToSuggestion }: Props) => {
  const { id } = useParams();
  const listRef = useRef(null);
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

  const drawContent = (content: Suggestion) => (
    <TRow
      key={content.id}
      role="link"
      tabIndex={0}
      onClick={() => goToSuggestion(content.id)}
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
      <ListWrapper>
        <ListContainer className={`${collapse ? "hidden" : ""}`}>
          <List
            isSearch={false}
            listObjectName="suggestions"
            ref={listRef}
            listTitle="Lista sugestii użytkowników"
            initReq={[...initReq]}
            contentRow={(content) => drawContent(content as Suggestion)}
          />
        </ListContainer>
        {id && (
          <SuggestionDetails
            collapse={collapse}
            onCollapse={onCollapse}
            refresh={() => {}}
            closeDetails={() => {}}
          />
        )}
      </ListWrapper>
    </>
  );
};

export default SuggestionListView;
