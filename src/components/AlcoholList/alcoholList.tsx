import React, { useContext, useEffect, useState } from 'react';
import { Alcohols, IAlcohol } from '../../@types/alcohol';
import { UserContextType } from '../../@types/user';
import { UserContext } from '../../context/userContext';
import { LinkPrimary, Row } from '../../styles/global.styled';
import { API } from '../../utils/constant';
import { get } from '../../utils/fetch';
import { Title } from './alcoholList.styled';
import AlcoholBlock from '../AlcoholBlock/AlcoholBlock';

const AlcoholList = () => {
  const { user } = useContext(UserContext) as UserContextType;
  const [alcohols, setAlcohols] = useState<Alcohols | null>(null);
  const updateView = () => {
    console.log('update view');
    return get({
      url: `${API}/alcohols/admin?limit=10&offset=0`,
      header: {
        Authorization: `Bearer ${user.access_token}`,
      },
    })
      .then((data) => setAlcohols(data))
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    if (user.access_token) updateView();
  }, [user.access_token]);

  const alcoholsBlock = alcohols?.alcohols?.map((alcohol: IAlcohol) => (
    <AlcoholBlock
      alcohol={alcohol}
      key={alcohol.alcohol_id}
      update={updateView}
    />
  ));
  return (
    <>
      <Title>Lista alkoholi: </Title>
      {alcoholsBlock || 'Wystąpił błąd!'}
      <Row margin="0 10px" justifyContent="flex-end">
        <LinkPrimary to="/alcohols/add">Dodaj Alkohol</LinkPrimary>
      </Row>
    </>
  );
};

export default AlcoholList;
