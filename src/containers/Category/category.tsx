import React, { useRef } from "react";
import {
  CapitalCase,
  Col,
  Container,
  ContentContainer,
  LinkPrimary,
  LinkSecondary,
  ListContainer,
  ListTitle,
  Row,
} from "../../styles/global.styled";
import { API, URL } from "../../utils/constant";
import List, { IListHandlers } from "../../components/List/List.view";
import { TCell, TRow } from "../../components/List/List.styled";

const initReq = ["GET", `${API}${URL.GET_CATEGORIES}`, ""] as const;

const Category = () => {
  const listRef = useRef(null);

  const drawContent = (content: any) => (
    <TRow key={content.id} role="link" tabIndex={0}>
      <TCell width="80px" data-label="Zdjęcia">
        test
      </TCell>
    </TRow>
  );

  return (
    <ContentContainer>
      <ListContainer>
        <List
          listObjectName="categories"
          ref={listRef}
          listTitle="Lista kategorii"
          initReq={[...initReq]}
          contentRow={(content) => drawContent(content)}
        />
      </ListContainer>
    </ContentContainer>
  );
};

export default Category;
