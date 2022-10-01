import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Alcohols, IAlcohol } from "../../@types/alcohol";
import {
  BtnSecondary,
  Content,
  ContentContainer,
  Icon,
  ListContainer,
  ListTitle,
  ListWrapper,
  Row,
  ScrollContent,
} from "../../styles/global.styled";
import Pagination from "../../components/Pagination/pagination";
import withDashboardWrapper from "../../utils/hoc/withDashboardWrapper";
import { SmallImage } from "./alcoholList.styled";
import { API, URL } from "../../utils/constant";
import { createImageName } from "../../utils/utils";
import { IPageInfo } from "../../@types/pagination";
import TextInput from "../../components/Inputs/TextInput";
import CategorySelect from "../../components/Inputs/CategorySelect";
import { CustomSelect } from "../../components/Select/select.styled";
import AlcoholDetails from "../AlcoholDetails/AlcoholDetails.view";
import Indicator from "../../components/Indicator/Indicator";
import List, { IListHandlers } from "../../components/List/List.view";
import { ISelectValue } from "../../components/Inputs/ICustomInput";
import { TCell, Title, TRow, Value } from "../../components/List/List.styled";

interface Props {
  selectedKind: string | null;
  onSelectedKind: (selected: { label: string; value: string }) => void;
  goToAlcoholDetails: (id: string, kind: string) => void;
  onCollapse: () => void;
  collapse: boolean;
  isDetail: () => boolean;
  listRef: React.RefObject<IListHandlers>;
}

const initalReq = [
  "POST",
  `${API}${URL.SEARCH_ALCOHOLS}?limit=10&offset=0`,
  null,
  {
    accept: "application/json",
    "Content-Type": "application/json",
  },
] as const;

const AlcoholListView = ({
  selectedKind,
  onSelectedKind,
  goToAlcoholDetails,
  onCollapse,
  collapse,
  isDetail,
  listRef,
}: Props) => {
  function drawContent(alcohol: IAlcohol): React.ReactNode {
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
              alcohol.name.toLowerCase() || "",
              "sm"
            )}?t=${new Date().getTime()}`}
            alt={`Zdjęcie przedstawiające alkohol ${alcohol.name}`}
          />
        </TCell>
        <TCell data-label="Nazwa alkoholu">
          <Title>Nazwa alkoholu</Title>
          <Value>{alcohol.name}</Value>
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
          <BtnSecondary width="120px" title={`Edytuj ${alcohol.name}`}>
            Edytuj
          </BtnSecondary>
        </TCell>
      </TRow>
    );
  }

  const additionalFilters = (
    <Row minHeight="56px">
      <CategorySelect
        title="Kategoria"
        value={selectedKind && { label: selectedKind, value: selectedKind }}
        onChange={(value: ISelectValue<string>) => onSelectedKind(value)}
      />
    </Row>
  );

  return (
    <ContentContainer>
      <ListContainer className={`${collapse ? "hidden" : ""}`}>
        <Indicator
          visible={isDetail()}
          size={50}
          top="50px"
          right="-25px"
          onClick={() =>
            onSelectedKind({
              label: selectedKind || "",
              value: selectedKind || "",
            })
          }
          icon="icon-chevron-right"
          type="secondary"
        />
        <List
          ref={listRef}
          listObjectName="alcohols"
          listTitle="Lista alkoholi"
          initReq={[...initalReq]}
          contentRow={(content) => drawContent(content as IAlcohol)}
          additionalFilters={additionalFilters}
        />
      </ListContainer>
      {isDetail() && (
        <AlcoholDetails collapse={collapse} onCollapse={onCollapse} />
      )}
    </ContentContainer>
  );
};

export default withDashboardWrapper(AlcoholListView);