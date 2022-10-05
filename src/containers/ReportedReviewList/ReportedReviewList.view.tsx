import React, { useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IReportedReview } from "../../@types/reportedReview";
import { IUser } from "../../@types/users";
import Breadcrumb from "../../components/Breadcrumb/breadcrumb";
import HeaderLogic from "../../components/Header/header.logic";
import Indicator from "../../components/Indicator/Indicator";
import { TCell, Title, TRow, Value } from "../../components/List/List.styled";
import List from "../../components/List/List.view";
import Pagination from "../../components/Pagination/pagination";
import Searcher from "../../components/Searcher/searcher";
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
import ReportedReviewDetail from "../ReportedReviewDetail/ReportedReviewDetail.view";
import UserDetail from "../UserDetails/UserDetail.view";

const initReq = ["GET", `${API}${URL.REPORTED_REVIEW}`, null] as const;
const width = document.body.clientWidth;

const ReportedReviewList = () => {
  const { id } = useParams();
  const listRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isSmallScreen = () => width < 1200 && !!id;
  const [collapse, setCollapse] = useState<boolean>(isSmallScreen());

  const goToReviewDetails = (index?: string) => {
    setCollapse(width < 1200);
    navigate(`/reportedReview/${index ? `${index}` : ""}${location.search}`);
  };

  const onCollapse = () => {
    if (isSmallScreen()) {
      setCollapse(false);
      navigate(`/reportedReview${location.search}`);
      return;
    }
    setCollapse((prev) => !prev);
  };

  const drawContent = (content: IReportedReview) => (
    <TRow
      key={content.id}
      role="link"
      tabIndex={0}
      onClick={() => goToReviewDetails(content.id)}
    >
      <TCell
        padding="10px 20px"
        data-label="Nazwa uzytkownika"
        verticalAlign="top"
      >
        <Title>Komentarz stworzył</Title>
        <Value>{content.username}</Value>
      </TCell>
      <TCell
        padding="10px 20px"
        data-label="Komentarz stworzył dnia"
        verticalAlign="top"
      >
        <Title>Komentarz stworzył dnia</Title>
        <Value>{getDate(content.date)}</Value>
      </TCell>
      <TCell
        padding="10px 20px"
        data-label="ID skomentowanego alkoholu"
        verticalAlign="top"
      >
        <Title>ID skomentowanego alkoholu</Title>
        <Value>{content.alcohol_id}</Value>
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
            onClick={() => goToReviewDetails()}
            icon="icon-chevron-right"
            type="secondary"
          />
          <List
            isSearch={false}
            listObjectName="reviews"
            ref={listRef}
            listTitle="Lista zgłoszonych komentarzy"
            initReq={[...initReq]}
            contentRow={(content) => drawContent(content as IReportedReview)}
          />
        </ListContainer>
        {id && (
          <ReportedReviewDetail collapse={collapse} onCollapse={onCollapse} />
        )}
      </ContentContainer>
    </>
  );
};

export default withDashboardWrapper(ReportedReviewList);
