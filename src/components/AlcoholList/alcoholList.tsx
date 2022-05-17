import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Alcohols, IAlcohol } from '../../@types/alcohol';
import { UserContextType } from '../../@types/user';
import { UserContext } from '../../context/userContext';
import { Col, LinkSecondary, Row } from '../../styles/global.styled';
import { API } from '../../utils/constant';
import { get } from '../../utils/fetch';
import { Alcoholist, More, Title } from './alcoholList.styled';

const AlcoholList = () => {
  const { user } = useContext(UserContext) as UserContextType;
  const [alcohols, setAlcohols] = useState<Alcohols | null>(null);
  useEffect(() => {
    get({
      url: `${API}/alcohols/admin?limit=10&offset=0`,
      header: {
        Authorization: `Bearer ${user.access_token}`,
      },
    })
      .then((data) => setAlcohols(data))
      .catch((e) => console.log(e));
  }, []);

  const alcoholsBlock = alcohols?.alcohols?.map((alcohol: IAlcohol) => (
    <Alcoholist
      justifyContent="space-between"
      padding="10px 20px;"
      margin="10px"
      key={alcohol.alcohol_id}
    >
      <More to={`/alcohols/${alcohol.barcodes[0].barcode}`}>
        <Row gap="10px" flex="1">
          <Col justifyContent="center">{alcohol.alcohol_id}.</Col>
          <Col justifyContent="center" flex="1">
            {alcohol.name}
          </Col>
          <Col flex="1">
            <Col>{alcohol.kind}</Col>
            <Col>{alcohol.type}</Col>
          </Col>
        </Row>
      </More>
      <Row gap="10px">
        <Col justifyContent="center">
          <Link to={`/alcohols/edit/${alcohol.barcodes[0].barcode}`}>
            Edytuj
          </Link>
        </Col>
        <Col justifyContent="center">Usuń</Col>
      </Row>
    </Alcoholist>
  ));
  return (
    <>
      <Title>Lista alkoholi: </Title>
      {alcoholsBlock || 'Wystąpił błąd!'}
      <Row margin="0 10px" justifyContent="flex-end">
        <LinkSecondary to="/alcohols/add">Dodaj Alkohol</LinkSecondary>
      </Row>
    </>
  );
};

export default AlcoholList;
