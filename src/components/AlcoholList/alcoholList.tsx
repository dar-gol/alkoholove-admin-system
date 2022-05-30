import React from 'react';
import { IAlcohol } from '../../@types/alcohol';
import { LinkPrimary, Row } from '../../styles/global.styled';
import { Title } from './alcoholList.styled';
import AlcoholBlock from '../AlcoholBlock/AlcoholBlock';
import Pagination from '../Pagination/pagination';
import Searcher from '../Searcher/searcher';
import useAlcohols from '../../utils/hooks/useAlcohols';

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
      <Title>Lista Alkoholi: </Title>
      <Searcher setLimit={changePageSize} update={search} />
      {alcoholsBlock || 'Wystąpił błąd!'}
      <Pagination
        lastPage={Math.ceil(page.total / page.limit)}
        offset={page.number}
        setOffset={changePage}
      />
      <Row margin="10px 10px" justifyContent="flex-end">
        <LinkPrimary to="/alcohols/add">Dodaj Alkohol</LinkPrimary>
      </Row>
    </>
  );
};

export default AlcoholList;
