import React, { useState } from "react";
import { IAlcohol } from "../../@types/alcohol";
import { SmallImage } from "../../containers/AlcoholList/alcoholList.styled";
import { BtnSecondary } from "../../styles/global.styled";
import { API, URL } from "../../utils/constant";
import { createImageName } from "../../utils/utils";
import { TCell, Title, TRow, Value } from "../List/List.styled";

interface Props {
  alcohol: IAlcohol;
  goToAlcoholDetails: (value: string, kind: string) => void;
  goToEdit: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => void;
}

const AlcoholBlock = ({ alcohol, goToAlcoholDetails, goToEdit }: Props) => {
  const t = 0;
  return (
    <TRow
      key={alcohol.id}
      title={`Pokaz wiecej informacji o alkoholu: ${alcohol.name}.`}
      onClick={() => goToAlcoholDetails(alcohol.barcode[0], alcohol.kind)}
      role="link"
      tabIndex={0}
    >
      <TCell width="80px" data-label="Zdjęcia">
        <SmallImage
          src={`${URL.GET_IMAGE}/${createImageName(
            alcohol.id.toLowerCase() || "",
            "sm"
          )}?t=${new Date().getTime()}`}
          alt={`Zdjęcie przedstawiające alkohol ${alcohol.name}`}
        />
      </TCell>
      <TCell data-label="Nazwa alkoholu">
        <Title>Nazwa alkoholu</Title>
        <Value maxWidth="100px">{alcohol.name}</Value>
      </TCell>
      <TCell data-label="Rodzaj">
        <Title>Rodzaj</Title>
        <Value>{alcohol.kind}</Value>
      </TCell>
      <TCell data-label="Typ">
        <Title>Typ</Title>
        <Value>{alcohol.type}</Value>
      </TCell>
      <TCell width="140px" data-label="Akcje">
        <BtnSecondary
          width="120px"
          title={`Edytuj ${alcohol.name}`}
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
            goToEdit(e, alcohol.barcode[0])
          }
        >
          Edytuj
        </BtnSecondary>
      </TCell>
    </TRow>
  );
};

function areEqual(
  prevProps: { alcohol: IAlcohol },
  nextProps: { alcohol: IAlcohol }
) {
  return prevProps.alcohol.id === nextProps.alcohol.id;
}

export default React.memo(AlcoholBlock, areEqual);
