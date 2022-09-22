import React from "react";
import Select from "react-select";
import { Alcohols, IAlcohol } from "../../@types/alcohol";
import {
  BtnSecondary,
  Content,
  Icon,
  ListTitle,
  Row,
  ScrollContent,
} from "../../styles/global.styled";
import AlcoholBlock from "../../components/AlcoholBlock/AlcoholBlock";
import Pagination from "../../components/Pagination/pagination";
import Searcher from "../../components/Searcher/searcher";
import useAlcohols from "../../utils/hooks/useAlcohols";
import HeaderLogic from "../../components/Header/header.logic";
import Breadcrumb from "../../components/Breadcrumb/breadcrumb";
import withDashboardWrapper from "../../utils/hoc/withDashboardWrapper";
import {
  CustomSelect,
  SmallImage,
  Table,
  TCell,
  Title,
  TRow,
  Value,
} from "./alcoholList.styled";
import { URL } from "../../utils/constant";
import { createImageName } from "../../utils/utils";
import { IOption } from "../../@types/inputs";
import { IPageInfo } from "../../@types/pagination";
import TextInput from "../../components/Inputs/TextInput";

interface Props {
  page: IPageInfo;
  categories: { label: string; value: string }[];
  alcohols: Alcohols;
  changePage: (page: number) => void;
}

const options: IOption[] = [
  {
    value: 10,
    label: "10 wierszy na stronę",
  },
  {
    value: 25,
    label: "25 wierszy na stronę",
  },
  {
    value: 50,
    label: "50 wierszy na stronę",
  },
  {
    value: 100,
    label: "100 wierszy na stronę",
  },
];

const AlcoholListView = ({ page, categories, alcohols, changePage }: Props) => {
  const goToAlcoholDetails = () => {
    console.log("Alcohol details");
  };

  return (
    <Content flex="1">
      <ListTitle>Lista alkoholi</ListTitle>
      <Row margin="10px 20px" gap="30px">
        <Row gap="10px" flex="1">
          <CustomSelect options={categories} onChange={(option, m) => {}} />
          <TextInput state="" placeholder="Wyszukaj alkohol" error="" />
          <BtnSecondary width="56px" height="56px">
            <Icon className="icon-search" />
          </BtnSecondary>
        </Row>
        <Row minWidth="250px" justifyContent="end">
          <CustomSelect options={options} onChange={(option, m) => {}} />
        </Row>
      </Row>
      <ScrollContent>
        <Table>
          <tbody>
            {alcohols?.map((alcohol) => (
              <TRow
                key={alcohol.id}
                title={`Pokaz wiecej informacji o alkoholu: ${alcohol.name}.`}
                onClick={goToAlcoholDetails}
                role="link"
                tabIndex={0}
              >
                <TCell width="80px">
                  <SmallImage
                    src={`${URL.GET_IMAGE}/${createImageName(
                      alcohol.name.toLowerCase() || "",
                      "sm"
                    )}?t=${new Date().getTime()}`}
                    alt={`Zdjęcie przedstawiające alkohol ${alcohol.name}`}
                  />
                </TCell>
                <TCell>
                  <Title>Nazwa alkoholu</Title>
                  <Value>{alcohol.name}</Value>
                </TCell>
                <TCell>
                  <Title>Rodzaj</Title>
                  <Value>{alcohol.kind}</Value>
                </TCell>
                <TCell>
                  <Title>Typ</Title>
                  <Value>{alcohol.type}</Value>
                </TCell>
                <TCell width="140px">
                  <BtnSecondary width="120px" title={`Edytuj ${alcohol.name}`}>
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
    </Content>
  );
};

export default withDashboardWrapper(AlcoholListView);
