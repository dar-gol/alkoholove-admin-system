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
import CategoryDetails from "../CategoryDetails/CategoryDetails.view";
import Indicator from "../../components/Indicator/Indicator";

const initReq = ["GET", `${API}${URL.GET_CATEGORIES}`, ""] as const;

interface Props {
  listRef: React.RefObject<IListHandlers>;
  goToCategoryDetails: (id: string) => void;
  drawPropertiesNames: (property: Property[]) => string;
  collapse: boolean;
  onCollapse: () => void;
  id: string | undefined;
}

const CategoryView = ({
  listRef,
  goToCategoryDetails,
  drawPropertiesNames,
  collapse,
  onCollapse,
  id,
}: Props) => {
  const drawContent = (content: ICategory) => (
    <TRow
      key={content.id}
      role="link"
      tabIndex={0}
      onClick={() => goToCategoryDetails(content.title)}
    >
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
      <ListContainer className={`${collapse ? "hidden" : ""}`}>
        <Indicator
          visible={!!id}
          size={50}
          top="50px"
          right="-25px"
          onClick={() => goToCategoryDetails("")}
          icon="icon-chevron-right"
          type="secondary"
        />
        <List
          isSearch={false}
          listObjectName="categories"
          ref={listRef}
          listTitle="Lista kategorii"
          initReq={[...initReq]}
          contentRow={(content) => drawContent(content as ICategory)}
        />
      </ListContainer>
      {id && <CategoryDetails collapse={collapse} onCollapse={onCollapse} />}
    </ContentContainer>
  );
};

export default withDashboardWrapper(CategoryView);
