import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAlcohol from '../../utils/hooks/useAlcohol';
import Breadcrumb from '../../components/Breadcrumb/breadcrumb';
import Header from '../../components/Header/header';
import { API } from '../../utils/constant';
import { get } from '../../utils/fetch';

const AlcoholDetails = () => {
  const { alcoholBarcode } = useParams();
  const alcohol = useAlcohol(alcoholBarcode || '');
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    if (alcohol?.image_name) {
      get({ url: `${API}/media/${alcohol.image_name}?size=sm` })
        .then((data) => data.json())
        .then((data) => {
          const reader = new FileReader();
          reader.readAsDataURL(data);
          reader.onloadend = () => {
            const base64data: string = reader.result as string;
            setImage(base64data);
          };
        });
    }
  }, [alcohol?.image_name]);

  const JSX = alcohol && (
    <ul>
      <li>ID: {alcohol.alcohol_id}</li>
      <li>
        Kody kreskowe:
        {alcohol.barcodes?.map(({ barcode }) => (
          <ul key={barcode}>
            <li>{barcode}</li>
          </ul>
        ))}
      </li>
      <li>Nazwa: {alcohol.name}</li>
      <li>Rodzaj: {alcohol.kind}</li>
      <li>Typ: {alcohol.type}</li>
      <li>Ilość promili: {alcohol.alcohol_by_volume}</li>
      <li>Producent: {alcohol.manufacturer}</li>
      <li>Ocena: {alcohol.rating}</li>
      <li>Opis: {alcohol.description}</li>
      <li>Kolor: {alcohol.color}</li>
      <li>Temperatura podania: {alcohol.serving_temperature}</li>
      <li>Region: {alcohol.region.name}</li>
      <li>Kraj: {alcohol.region.country.name}</li>
      <li>
        Pasujące posiłki:
        {alcohol.foods?.map(({ id, name }) => (
          <ul key={id}>
            <li>{name}</li>
          </ul>
        ))}
      </li>
      <li>
        Aromaty:
        {alcohol.aromas?.map(({ id, name }) => (
          <ul key={id}>
            <li>{name}</li>
          </ul>
        ))}
      </li>
      <li>
        Składniki:
        {alcohol.ingredients?.map(({ id, name }) => (
          <ul key={id}>
            <li>{name}</li>
          </ul>
        ))}
      </li>
      <li>
        Smaki:
        {alcohol.tastes?.map(({ id, name }) => (
          <ul key={id}>
            <li>{name}</li>
          </ul>
        ))}
      </li>
      <li>
        Finisz:
        {alcohol.finishes?.map(({ id, name }) => (
          <ul key={id}>
            <li>{name}</li>
          </ul>
        ))}
      </li>
      <li>IBU: {alcohol.bitterness_ibu}</li>
      <li>Kolor (SRM): {alcohol.srm}</li>
      <li>Ekstrakt: {alcohol.extract}</li>
      <li>Fermentacja: {alcohol.fermentation}</li>
      <li>Filtrowane: {alcohol.is_filtered ? 'TAK' : 'NIE'}</li>
      <li>Pasteryzowane: {alcohol.is_pasteurized ? 'TAK' : 'NIE'}</li>
      <li>Wiek: {alcohol.age || '-'}</li>
      <li>Rok: {alcohol.year || '-'}</li>
      <li>Winorosl: {alcohol.vine_stock || '-'}</li>
      <li>
        <img src={image || ''} alt="wóda" />
      </li>
    </ul>
  );

  return (
    <>
      <Header />
      <Breadcrumb />
      <div>{JSX}</div>
    </>
  );
};

export default AlcoholDetails;
