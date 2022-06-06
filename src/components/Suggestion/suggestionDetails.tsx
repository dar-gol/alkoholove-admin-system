import React, { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle, ChevronLeft } from 'react-feather';
import { Link } from 'react-router-dom';
import { Suggestion } from '../../@types/suggestions';
import {
  BtnSecondary,
  Col,
  Key,
  ListTitle,
  Row,
  Tuple,
  Value,
} from '../../styles/global.styled';
import { API, URL } from '../../utils/constant';
import useAuthReq from '../../utils/hooks/useReq';
import { GoToList } from './suggestion.styled';

interface IProps {
  deleteSuggestion: (id: string) => void;
  changeToList: () => void;
  id: string;
}

const SuggestionDetails = ({ changeToList, id, deleteSuggestion }: IProps) => {
  const [suggestionBlock, setSuggestionBlock] = useState<any>(null);
  const { send } = useAuthReq('GET', `${API}${URL.GET_SUGGESTIONS}/${id}`, '', {
    Accept: 'application/json',
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
        </Link>{' '}
      </>
    ));
  };

  const descriptionBlock = (suggestion: any) =>
    suggestion?.descriptions.map((value: any, index: any) => {
      const key = `description${id}${index}`;
      return (
        <Tuple key={key}>
          <Key>Opis {index + 1}:</Key>
          <Value>{value}</Value>
        </Tuple>
      );
    });

  const getBlock = async (suggestion: any) => {
    const userBlock = await usersBlock(suggestion);
    const block = (
      <Col padding="0 10px">
        <Tuple>
          <Key>Uzytkownicy</Key>
          <Value>{userBlock}</Value>
        </Tuple>
        <Tuple>
          <Key>Kod kreskowy</Key>
          <Value>{suggestion?.barcode}</Value>
        </Tuple>
        <Tuple>
          <Key>Nazwa alkoholu</Key>
          <Value>{suggestion?.name}</Value>
        </Tuple>
        <Tuple>
          <Key>Rodzaj</Key>
          <Value>{suggestion?.kind}</Value>
        </Tuple>
        {descriptionBlock(suggestion)}
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
      <Row alignItems="center">
        <GoToList onClick={changeToList}>
          <ChevronLeft size={32} />
        </GoToList>
        <ListTitle>Sugestia uzytkownika</ListTitle>
      </Row>
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
