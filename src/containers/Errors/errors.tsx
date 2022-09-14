import React from "react";
import { Link } from "react-router-dom";
import { IError } from "../../@types/errors";
import Breadcrumb from "../../components/Breadcrumb/breadcrumb";
import HeaderLogic from "../../components/Header/header.logic";
import Pagination from "../../components/Pagination/pagination";
import Searcher from "../../components/Searcher/searcher";
import { Container, ListTitle, Row } from "../../styles/global.styled";
import useErrors from "../../utils/hooks/useErrors";
import { Block, Warn, Black } from "./errors.styled";

const Errors = () => {
  const { errors, changePage, changePageSize, page } = useErrors();

  const ErrorBlocks = errors?.map((error: IError, index: number) => (
    <Block
      key={error.id}
      justifyContent="space-between"
      padding="8px 15px;"
      margin="10px"
    >
      <Row flex="1">
        <Link to={`/errors/${error.id}`}>
          <Warn>
            <Black>{index + 1}.</Black> {error.description}
          </Warn>
        </Link>
      </Row>
    </Block>
  ));

  return (
    <>
      <HeaderLogic />
      <Breadcrumb />
      <Container>
        <ListTitle>Lista zgłoszonych błędów: </ListTitle>
        <Searcher setLimit={changePageSize} update={() => {}} />
        {ErrorBlocks}
        <Pagination
          lastPage={Math.ceil(page.total / page.limit)}
          offset={page.number}
          setOffset={changePage}
        />
      </Container>
    </>
  );
};

export default Errors;
