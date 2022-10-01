import React, { useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
import UserDetail from "../UserDetails/UserDetail.view";

const initReq = ["GET", `${API}${URL.USERS}`, null] as const;
const width = document.body.clientWidth;

const UsersListView = () => {
  const { id } = useParams();
  const listRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isSmallScreen = () => width < 1200 && !!id;
  const [collapse, setCollapse] = useState<boolean>(isSmallScreen());

  const goToUserDetails = (index?: string) => {
    setCollapse(width < 1200);
    navigate(`/user/${index ? `${index}` : ""}${location.search}`);
  };

  const onCollapse = () => {
    if (isSmallScreen()) {
      setCollapse(false);
      navigate(`/user${location.search}`);
      return;
    }
    setCollapse((prev) => !prev);
  };

  const drawContent = (content: IUser) => (
    <TRow
      key={content.id}
      role="link"
      tabIndex={0}
      onClick={() => goToUserDetails(content.id)}
    >
      <TCell
        padding="10px 20px"
        data-label="Nazwa uzytkownika"
        verticalAlign="top"
      >
        <Title>Nazwa uzytkownika</Title>
        <Value>{content.username}</Value>
      </TCell>
      <TCell
        padding="10px 20px"
        data-label="Email uzytkownika"
        verticalAlign="top"
      >
        <Title>Email uzytkownika</Title>
        <Value>{content.email}</Value>
      </TCell>
      <TCell
        padding="10px 20px"
        data-label="Data stworzenia konta"
        verticalAlign="top"
      >
        <Title>Data stworzenia konta</Title>
        <Value>{getDate(content.created_on)}</Value>
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
            onClick={() => goToUserDetails()}
            icon="icon-chevron-right"
            type="secondary"
          />
          <List
            isSearch={false}
            listObjectName="users"
            ref={listRef}
            listTitle="Lista uzytkowników"
            initReq={[...initReq]}
            contentRow={(content) => drawContent(content as IUser)}
          />
        </ListContainer>
        {id && <UserDetail collapse={collapse} onCollapse={onCollapse} />}
      </ContentContainer>
    </>
  );
};

export default withDashboardWrapper(UsersListView);
