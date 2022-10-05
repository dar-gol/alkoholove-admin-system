import React, { useEffect, useState } from "react";
import { API, URL } from "../../utils/constant";
import useQueryParams from "../../utils/hooks/useQueryParams";
import useAuthReq from "../../utils/hooks/useReq";
import Indicator from "../Indicator/Indicator";
import {
  Container,
  Hide,
  IndicatorContainer,
  SuggNumber,
} from "./suggestion.styled";
import SuggestionDetails from "./suggestionDetails";
import SuggestionList from "./suggestionList";

interface Props {
  setInput: (name: string, value: string) => void;
}

const Suggestion = ({ setInput }: Props) => {
  const { query, updateParam } = useQueryParams();
  const [hide, setHide] = useState<boolean>(!query.suggestion);
  const [amount, setAmount] = useState<number | null>(null);
  const toggleHide = () => setHide((prev) => !prev);
  const { send } = useAuthReq("GET", `${API}${URL.GET_TOTAL_SUGGESTIONS}`, "");

  const changeToList = () => {
    updateParam("suggestion", "");
  };

  const chooseSuggestion = (id: string) => updateParam("suggestion", id);

  const deleteSuggestion = (id: string) => {
    send({
      method: "DELETE",
      url: `${API}${URL.GET_SUGGESTIONS}/${id}`,
    }).then(() => {
      setAmount((prev) => Number(prev) - 1);
      changeToList();
    });
  };

  useEffect(() => {
    send({})
      .then((data) => data.json())
      .then((data) => {
        setAmount(data);
      });
  }, []);

  return (
    <Container hide={hide}>
      <IndicatorContainer>
        <Indicator
          size={30}
          top="0"
          left="0"
          text={amount?.toString()}
          onClick={toggleHide}
          type="green"
        />
        <Indicator
          size={50}
          top="calc(50% - 25px)"
          left="calc(50% - 25px)"
          onClick={toggleHide}
          icon="icon-Suggestion"
          type="secondary"
        />
      </IndicatorContainer>
      {!query.suggestion ? (
        <SuggestionList goToSuggestion={chooseSuggestion} />
      ) : (
        <SuggestionDetails
          deleteSuggestion={deleteSuggestion}
          changeToList={changeToList}
          id={query.suggestion}
          hide={hide}
          setInput={setInput}
        />
      )}
    </Container>
  );
};

export default Suggestion;
