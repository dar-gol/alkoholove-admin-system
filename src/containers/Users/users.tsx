import React from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb/breadcrumb";
import HeaderLogic from "../../components/Header/header.logic";
import Pagination from "../../components/Pagination/pagination";
import Searcher from "../../components/Searcher/searcher";
import { Container, ListTitle } from "../../styles/global.styled";
import useUsers from "../../utils/hooks/useUsers";
import { Block } from "./users.styled";

const Users = () => {
  const { users, page, changePage, changePageSize, search } = useUsers();

  const userBlocks =
    users &&
    users.map((user, index) => (
      <Block
        justifyContent="space-between"
        padding="10px 20px;"
        margin="10px"
        key={user.username}
        ban={user.is_banned}
        admin={user.is_admin}
      >
        <Link to={`/users/${user.id}`}>
          {index + 1}. {user.username}
        </Link>
      </Block>
    ));

  return (
    <>
      <HeaderLogic />
      <Breadcrumb />
      <Container>
        <ListTitle>Lista użytkowników: </ListTitle>
        <Searcher setLimit={changePageSize} update={search} />
        {userBlocks}
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
