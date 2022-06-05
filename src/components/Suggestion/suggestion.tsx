import React, { useEffect, useState } from 'react';
import { ChevronRight, ChevronLeft } from 'react-feather';
import { useSearchParams } from 'react-router-dom';
import { API, URL } from '../../utils/constant';
import useAuthReq from '../../utils/hooks/useReq';
import { Container, Hide, SuggNumber } from './suggestion.styled';
import SuggestionDetails from './suggestionDetails';
import SuggestionList from './suggestionList';

const Suggestion = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [hide, setHide] = useState<boolean>(!searchParams.has('suggestion'));
  const [amount, setAmount] = useState<number | null>(null);
  const toggleHide = () => setHide((prev) => !prev);
  const { send } = useAuthReq('GET', `${API}${URL.GET_TOTAL_SUGGESTIONS}`, '');

  const changeToList = () => {
    searchParams.delete('suggestion');
    setSearchParams(searchParams);
  };

  const chooseSuggestion = (id: string) => setSearchParams({ suggestion: id });

  const deleteSuggestion = (id: string) => {
    send({
      method: 'DELETE',
      url: `${API}${URL.GET_SUGGESTIONS}/${id}`,
    }).then(() => {
      setAmount((prev) => Number(prev) - 1);
      changeToList();
    });
  };

  useEffect(() => {
    send({})
      .then((data) => data.json())
      .then((data) => setAmount(data || null));
  }, []);

  return (
    <Container hide={hide}>
      <Hide onClick={toggleHide}>
        {amount && <SuggNumber>{amount}</SuggNumber>}
        {hide ? <ChevronLeft /> : <ChevronRight />}
      </Hide>
      {!searchParams.has('suggestion') ? (
        <SuggestionList choose={chooseSuggestion} />
      ) : (
        <SuggestionDetails
          deleteSuggestion={deleteSuggestion}
          changeToList={changeToList}
          id={searchParams.get('suggestion') as string}
        />
      )}
    </Container>
  );
};

export default Suggestion;
