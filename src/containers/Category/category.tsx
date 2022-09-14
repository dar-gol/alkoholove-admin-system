import React from "react";

import Breadcrumb from "../../components/Breadcrumb/breadcrumb";
import HeaderLogic from "../../components/Header/header.logic";
import Pagination from "../../components/Pagination/pagination";

import Searcher from "../../components/Searcher/searcher";
import {
  CapitalCase,
  Col,
  Container,
  LinkPrimary,
  LinkSecondary,
  ListTitle,
  Row,
} from "../../styles/global.styled";
import useCategory from "../../utils/hooks/useCategory";
import { Block } from "./category.styled";

const Category = () => {
  const { ctg, changePage, changePageSize, page } = useCategory();

  const categoryBlock =
    ctg?.categories &&
    ctg?.categories.map((el, index) => (
      <Block
        justifyContent="space-between"
        margin="10px"
        padding="10px 20px"
        key={el.id}
      >
        <Row gap="10px" alignItems="center">
          <Col>{index + 1}.</Col>
          <Col>
            <CapitalCase>{el.title}</CapitalCase>
          </Col>
        </Row>
        <Col>
          <Row gap="20px">
            <LinkPrimary to={`/category/edit/${el.title}`}>Edytuj</LinkPrimary>
          </Row>
        </Col>
      </Block>
    ));

  return (
    <>
      <HeaderLogic />
      <Breadcrumb />
      <Container>
        <ListTitle>Lista kategorii: </ListTitle>
        <Searcher setLimit={changePageSize} update={(input) => {}} />
        {categoryBlock}
        <Pagination
          lastPage={Math.ceil(page.total / page.limit)}
          offset={page.number}
          setOffset={changePage}
        />
        <Row margin="10px 10px" justifyContent="flex-end" gap="20px">
          <LinkSecondary to="/category/add">Dodaj kategorię</LinkSecondary>
          <LinkPrimary to="/alcohols/add">Dodaj Alkohol</LinkPrimary>
        </Row>
      </Container>
    </>
  );
};

export default Category;
