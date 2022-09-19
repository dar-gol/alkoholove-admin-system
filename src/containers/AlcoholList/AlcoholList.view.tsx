import React from "react";
import { IAlcohol } from "../../@types/alcohol";
import {
  Container,
  Content,
  LinkPrimary,
  LinkSecondary,
  ListTitle,
  Row,
} from "../../styles/global.styled";
import AlcoholBlock from "../../components/AlcoholBlock/AlcoholBlock";
import Pagination from "../../components/Pagination/pagination";
import Searcher from "../../components/Searcher/searcher";
import useAlcohols from "../../utils/hooks/useAlcohols";
import HeaderLogic from "../../components/Header/header.logic";
import Breadcrumb from "../../components/Breadcrumb/breadcrumb";
import withDashboardWrapper from "../../utils/hoc/withDashboardWrapper";

const AlcoholListView = () => {
  const { search, remove, changePageSize, changePage, alcohols, page } =
    useAlcohols();
  return (
    <Content>
      {alcohols?.map((alcohol) => (
        <table>
          <tr>
            <td>
              <p>Nazwa alkoholu</p>
              <p>{alcohol.name}</p>
            </td>
            <td>
              <p>Rodzaj</p>
              <p>{alcohol.kind}</p>
            </td>
            <td>
              <p>Typ</p>
              <p>{alcohol.type}</p>
            </td>
          </tr>
        </table>
      ))}
    </Content>
  );
};

export default withDashboardWrapper(AlcoholListView);
