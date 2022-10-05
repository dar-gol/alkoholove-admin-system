import React, { useEffect, useState } from "react";
import { AlertCircle, CheckCircle, ChevronLeft } from "react-feather";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Suggestion } from "../../@types/suggestions";
import {
  BtnPrimary,
  BtnSecondary,
  Col,
  InfoBar,
  Key,
  ListTitle,
  Row,
  Tuple,
  Value,
} from "../../styles/global.styled";
import { API, URL } from "../../utils/constant";
import useQueryParams from "../../utils/hooks/useQueryParams";
import useAuthReq from "../../utils/hooks/useReq";
import Indicator from "../Indicator/Indicator";
import { GoToList } from "./suggestion.styled";

interface IProps {
  deleteSuggestion: (id: string) => void;
  changeToList: () => void;
  id: string;
  hide: boolean;
  setInput: (name: string, value: string) => void;
}

const SuggestionDetails = ({
  changeToList,
  id,
  deleteSuggestion,
  hide,
  setInput,
}: IProps) => {
  const [suggestionBlock, setSuggestionBlock] = useState<any>(null);
  const { send } = useAuthReq("GET", `${API}${URL.GET_SUGGESTIONS}/${id}`, "", {
    Accept: "application/json",
  });

  const usersBlock = async (suggestion: any) => {
    const res =
      suggestion &&
      (await Promise.all(
        suggestion.user_ids.map(async (userID: any) => {
          const user = await send({ url: `${API}${URL.USERS}/${userID}` }).then(
            (data) => data.json()
          );
          return user;
        })
      ));
    const users: any = await res;
    return users?.map((user: any) => (
      <>
        <Link to={`/users/${user.id}`} key={user.id}>
          {user.username}
        </Link>{" "}
      </>
    ));
  };

  const descriptionBlock = (suggestion: any) =>
    suggestion?.descriptions?.map((value: any, index: any) => {
      const key = `description${id}${index}`;
      return (
        <Tuple key={key} position="relative">
          <Indicator
            size={40}
            top="calc(50% - 20px)"
            left="0"
            onClick={() => setInput("description", value)}
            icon="icon-chevron-right"
            type="secondary"
          />
          <Key margin="auto 0 auto 50px">Opis {index + 1}:</Key>
          <Value>{value}</Value>
        </Tuple>
      );
    });

  const setAllInput = async () => {
    const suggestion = (await send({}).then((data: Response) =>
      data.json()
    )) as Suggestion;
    setInput(
      "barcode",
      JSON.stringify({
        label: suggestion?.barcode,
        value: suggestion?.barcode,
      })
    );

    setInput("name", suggestion?.name);
    suggestion?.descriptions?.map((desc: any) => setInput("description", desc));
  };

  const getBlock = async (suggestion: any) => {
    const userBlock = await usersBlock(suggestion);
    const block = (
      <Col padding="0 10px">
        <Tuple>
          <Key>Uzytkownicy</Key>
          <Value>{userBlock}</Value>
        </Tuple>
        <Tuple position="relative">
          <Indicator
            size={40}
            top="calc(50% - 20px)"
            left="0"
            onClick={() =>
              setInput(
                "barcode",
                JSON.stringify({
                  label: suggestion?.barcode,
                  value: suggestion?.barcode,
                })
              )
            }
            icon="icon-chevron-right"
            type="secondary"
          />
          <Key margin="auto 0 auto 50px">Kod kreskowy</Key>
          <Value>{suggestion?.barcode}</Value>
        </Tuple>
        <Tuple position="relative">
          <Indicator
            size={40}
            top="calc(50% - 20px)"
            left="0"
            onClick={() => setInput("name", suggestion?.name)}
            icon="icon-chevron-right"
            type="secondary"
          />
          <Key margin="auto 0 auto 50px">Nazwa alkoholu</Key>
          <Value>{suggestion?.name}</Value>
        </Tuple>
        <Tuple>
          <Key>Rodzaj</Key>
          <Value>{suggestion?.kind}</Value>
        </Tuple>
        {descriptionBlock(suggestion)}
        <BtnPrimary onClick={() => setAllInput()} margin="20px 0">
          Dodaj wartosci do formularza
        </BtnPrimary>
        <BtnSecondary onClick={() => deleteSuggestion(id)}>
          Usuń sugestie
        </BtnSecondary>
      </Col>
    );
    setSuggestionBlock(block);
  };

  useEffect(() => {
    send({})
      .then((data: Response) => data.json())
      .then((data: Suggestion) => getBlock(data));
  }, []);
  return (
    <>
      <Row alignItems="center" visible={!hide}>
        <Indicator
          size={40}
          top="15px"
          left="-20px"
          icon="icon-chevron-left"
          onClick={changeToList}
          type="secondary"
        />
        <ListTitle>Sugestia użytkownika</ListTitle>
      </Row>
      <InfoBar margin="0 0 20px 0">
        <span className="icon-Info" />
        <p>
          Żeby wprowadzić pojedyńczą wartość możesz po prostu skopiować
          zaznaczając lub przyciskając na przycisk strzałki znajdujący się po
          prawej stronie w wierszu wartości. Możesz również wprowadzić wszystkie
          wartości naciskając na przycisk: &lsquo;Dodaj wartości do
          formularza&rsquo;
        </p>
      </InfoBar>
      {suggestionBlock || (
        <Col alignItems="center" margin="80px 0">
          <AlertCircle size={64} color="#F47521" />
          <p>Nie ma takiej sugestii!</p>
        </Col>
      )}
    </>
  );
};

export default SuggestionDetails;
