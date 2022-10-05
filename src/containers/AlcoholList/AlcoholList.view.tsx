import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Alcohols } from "../../@types/alcohol";
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
import { URL } from "../../utils/constant";
import { createImageName } from "../../utils/utils";
import { IPageInfo } from "../../@types/pagination";
import TextInput from "../../components/Inputs/TextInput";
import CategorySelect from "../../components/Inputs/CategorySelect";
import { CustomSelect } from "../../components/Select/select.styled";
import AlcoholDetails from "../AlcoholDetails/AlcoholDetails.view";
import Indicator from "../../components/Indicator/Indicator";
import {
  Table,
  TCell,
  Title,
  TRow,
  Value,
} from "../../components/List/List.styled";

interface Props {
  page: IPageInfo;
  alcohols: Alcohols;
  changePage: (page: number) => void;
  searchValue: string;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch: (value: string, kind?: string) => void;
  selectedKind: string | null;
  onSelectedKind: (selected: { label: string; value: string }) => void;
  rowsOnPage: { label: string; value: number }[];
  selectedRowsOnPage: { label: string; value: number };
  onRowsOnPage: (selected: unknown) => void;
  goToAlcoholDetails: (id: string, kind: string) => void;
  onCollapse: () => void;
  collapse: boolean;
  isDetail: () => boolean;
}

const AlcoholListView = ({
  page,
  alcohols,
  changePage,
  searchValue,
  onSearch,
  handleSearch,
  selectedKind,
  onSelectedKind,
  rowsOnPage,
  selectedRowsOnPage,
  onRowsOnPage,
  goToAlcoholDetails,
  onCollapse,
  collapse,
  isDetail,
}: Props) => (
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
      <ListWrapper>
        <ListTitle>Lista alkoholi</ListTitle>
        <Row margin="10px 20px" gap="10px" flexWrap="wrap" justifyContent="end">
          <Row minHeight="56px">
            <CategorySelect
              title="Kategoria"
              value={
                selectedKind && { label: selectedKind, value: selectedKind }
              }
              onChange={onSelectedKind}
            />
          </Row>
          <Row flex="1" gap="10px" minWidth="250px">
            <TextInput
              state=""
              placeholder="Wyszukaj alkohol"
              error=""
              value={searchValue}
              onChange={onSearch}
            />
            <BtnSecondary
              width="56px"
              height="56px"
              onClick={() => handleSearch(searchValue)}
            >
              <Icon className="icon-search" />
            </BtnSecondary>
          </Row>
          <Row minWidth="200px" justifyContent="end" minHeight="56px">
            <CustomSelect
              value={selectedRowsOnPage}
              options={rowsOnPage}
              onChange={onRowsOnPage}
            />
          </Row>
        </Row>
        <ScrollContent>
          <Table>
            <tbody>
              {alcohols?.map((alcohol) => (
                <TRow
                  key={alcohol.id}
                  title={`Pokaz wiecej informacji o alkoholu: ${alcohol.name}.`}
                  onClick={() =>
                    goToAlcoholDetails(alcohol.barcode[0], alcohol.kind)
                  }
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
                    <BtnSecondary
                      width="120px"
                      title={`Edytuj ${alcohol.name}`}
                    >
                      Edytuj
                    </BtnSecondary>
                  </TCell>
                </TRow>
              ))}
            </tbody>
          </Table>
        </ScrollContent>
        <Pagination
          lastPage={Math.ceil(page.total / page.limit)}
          pageInfo={page}
          setOffset={changePage}
        />
      </ListWrapper>
    </ListContainer>
    {isDetail() && (
      <AlcoholDetails collapse={collapse} onCollapse={onCollapse} />
    )}
  </ContentContainer>
);

export default withDashboardWrapper(AlcoholListView);
