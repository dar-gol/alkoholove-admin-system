import React, { useEffect, useState } from 'react';
import { CheckCircle } from 'react-feather';
import { IReq } from '../../@types/fetch';
import { IPageInfo } from '../../@types/pagination';
import {
  Suggestion,
  Suggestions,
  SuggResponse,
} from '../../@types/suggestions';
import { Col, ListTitle, Row } from '../../styles/global.styled';
import { API, URL } from '../../utils/constant';
import useAuthReq from '../../utils/hooks/useReq';
import Pagination from '../Pagination/pagination';
import Searcher from '../Searcher/searcher';
import { Block, List } from './suggestion.styled';

type Props = {
  choose: (id: string) => void;
};

const initPageInfo: IPageInfo = {
  limit: 10,
  offset: 0,
  total: 10,
  number: 0,
} as const;

const SuggestionList = ({ choose }: Props) => {
  const { send } = useAuthReq('GET', API + URL.GET_SUGGESTIONS, '', {
    Accept: 'application/json',
  });
  const [suggestions, setSuggestions] = useState<Suggestions | null>(null);
  const [page, setPage] = useState<IPageInfo>(initPageInfo);

  const update = (req: IReq = {}) => {
    send(req)
      .then((data: Response) => data.json())
      .then((data: SuggResponse) => {
        setSuggestions(data.suggestions.length ? data.suggestions : null);
        setPage((prev) => ({ ...prev, ...data.page_info }));
      });
  };

  const changePage = (index: number) => {
    const shift = index * page.limit;
    setPage((prev) => ({
      ...prev,
      number: index,
    }));
    update({
      url: `${API}${URL.GET_SUGGESTIONS}?limit=${page.limit}&offset=${shift}`,
    });
  };

  const changePageSize = (limit: number) => {
    setPage((prev) => ({
      ...prev,
      limit,
      number: 0,
    }));
    update({
      url: `${API}${URL.GET_SUGGESTIONS}?limit=${limit}&offset=0`,
    });
  };

  useEffect(() => update(), []);

  const suggestionBlock =
    suggestions &&
    suggestions.map((suggestion: Suggestion, index: number) => (
      <Block
        key={suggestion.id}
        margin="10px"
        padding="10px 20px"
        role="button"
        onClick={() => choose(suggestion.id)}
      >
        <Row flex="1">
          {index + 1}. {suggestion.kind}, {suggestion.name}
        </Row>
      </Block>
    ));
  return (
    <div>
      <ListTitle>Lista sugestii: </ListTitle>
      <Searcher
        setLimit={changePageSize}
        update={(input) => {}}
        isSearch={false}
      />
      <List>
        {suggestions ? (
          suggestionBlock
        ) : (
          <Col alignItems="center" margin="20px 0">
            <CheckCircle size={64} color="#F47521" />
            <p>Wszystkie sugestie zostały rozpatrzone</p>
          </Col>
        )}
      </List>
      <Pagination
        lastPage={Math.ceil(page.total / page.limit)}
        offset={page.number}
        setOffset={changePage}
      />
    </div>
  );
};

export default SuggestionList;
