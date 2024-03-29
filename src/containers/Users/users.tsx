import React from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb/breadcrumb";
import HeaderLogic from "../../components/Header/header.logic";
import Pagination from "../../components/Pagination/pagination";
import Searcher from "../../components/Searcher/searcher";
import { Container, ListTitle } from "../../styles/global.styled";
import { API, URL } from "../../utils/constant";
import useUsers from "../../utils/hooks/useUsers";
import { Block } from "./users.styled";

const Users = () => {
  const { users, page, changePage, changePageSize, search } = useUsers();

  return (
    <>
      <HeaderLogic />
      <Breadcrumb />
      <Container>
        <ListTitle>Lista użytkowników: </ListTitle>
        <Searcher setLimit={changePageSize} update={search} />
        <Pagination
          lastPage={Math.ceil(page.total / page.limit)}
          pageInfo={page}
          setOffset={changePage}
        />
      </Container>
    </>
  );
};

export default Users;
