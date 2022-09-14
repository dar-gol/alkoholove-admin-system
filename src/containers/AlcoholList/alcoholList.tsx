import React from "react";
import { IAlcohol } from "../../@types/alcohol";
import {
  Container,
  LinkPrimary,
  LinkSecondary,
  ListTitle,
  Row,
} from "../../styles/global.styled";
import AlcoholBlock from "../../components/AlcoholBlock/AlcoholBlock";
import Pagination from "../../components/Pagination/pagination";
import Searcher from "../../components/Searcher/searcher";
import useAlcohols from "../../utils/hooks/useAlcohols";
import HeaderLogic from "../../components/Header/header.logic";
import Breadcrumb from "../../components/Breadcrumb/breadcrumb";

const AlcoholList = () => {
  const { search, remove, changePageSize, changePage, alcohols, page } =
    useAlcohols();

  const alcoholsBlock = alcohols?.map((alcohol: IAlcohol, index) => (
    <AlcoholBlock
      alcohol={alcohol}
      key={alcohol.id}
      update={remove}
      index={index + 1}
    />
  ));
  return (
    <>
      <HeaderLogic />
      <Breadcrumb />
      <Container>
        <ListTitle>Lista Alkoholi: </ListTitle>
        <Searcher setLimit={changePageSize} update={search} />
        {alcoholsBlock || "Wystąpił błąd!"}
        <Pagination
          lastPage={Math.ceil(page.total / page.limit)}
          offset={page.number}
          setOffset={changePage}
        />
        <Row margin="10px 10px" justifyContent="flex-end" gap="20px">
          <LinkSecondary to="/category/add">Dodaj kategorię</LinkSecondary>
          <LinkPrimary to="/alcohol/add">Dodaj Alkohol</LinkPrimary>
        </Row>
      </Container>
    </>
  );
};

export default AlcoholList;
