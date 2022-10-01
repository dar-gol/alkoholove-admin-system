import React from "react";
import { TCell, Title, TRow, Value } from "../../components/List/List.styled";
import List, { IListHandlers } from "../../components/List/List.view";
import {
  CapitalCase,
  Col,
  ContentContainer,
  ListContainer,
  Row,
} from "../../styles/global.styled";
import { API, URL } from "../../utils/constant";
import withDashboardWrapper from "../../utils/hoc/withDashboardWrapper";
import { ICategory, Property } from "../../@types/category";

const initReq = ["GET", `${API}${URL.GET_CATEGORIES}`, ""] as const;

interface Props {
  listRef: React.RefObject<IListHandlers>;
}

const CategoryView = ({ listRef }: Props) => {
  const propertiesName = (props: Property[]): string[] =>
    props.map((prop) => prop.name).filter((name) => name !== "kind");

  const drawPropertiesNames = (props: Property[]): string => {
    const text = propertiesName(props).join(", ");
    return text === "" ? "Brak dodatkowych właściwości" : text;
  };
  const drawContent = (content: ICategory) => (
    <TRow key={content.id} role="link" tabIndex={0} pointerEvents="none">
      <TCell padding="20px" data-label="Nazwa kategorii" verticalAlign="top">
        <Title>Nazwa kategorii</Title>
        <Value>
          <CapitalCase>{content.title}</CapitalCase>
        </Value>
      </TCell>
      <TCell padding="20px" data-label="Dodatkowe właściwości">
        <Title>Dodatkowe wlaściwości</Title>
        <Value>
          <CapitalCase isNoWrap={false}>
            {drawPropertiesNames(content.properties)}
          </CapitalCase>
        </Value>
      </TCell>
    </TRow>
  );
  return (
    <ContentContainer>
      <ListContainer>
        <List
          isSearch={false}
          listObjectName="categories"
          ref={listRef}
          listTitle="Lista kategorii"
          initReq={[...initReq]}
          contentRow={(content) => drawContent(content as ICategory)}
        />
      </ListContainer>
    </ContentContainer>
  );
};

export default withDashboardWrapper(CategoryView);
