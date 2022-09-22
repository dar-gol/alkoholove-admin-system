import React, { useEffect, useState } from "react";
import { IPageInfo } from "../../@types/pagination";
import {
  BtnPrimary,
  BtnSecondary,
  InputText,
  Row,
} from "../../styles/global.styled";
import { CurrentPage, PageInfo } from "./pagination.styled";

interface IProps {
  lastPage: number;
  pageInfo: IPageInfo;
  setOffset: (page: number) => void;
}

const Pagination: React.FC<IProps> = ({ lastPage, pageInfo, setOffset }) => {
  const getIndexes = (length: number, shift: number): number[] =>
    Array.from({ length }, (_, i) => i + shift);

  const changePage = (page: number) => {
    setOffset(page);
  };

  const getGroup = () => {
    const page = pageInfo.number + 1;
    const diff = lastPage - page;
    const pages = [];
    if (page > 3) pages.push(...[1, "...", page - 1, page]);
    else pages.push(...getIndexes(page, 1));
    if (diff >= 3) pages.push(...[page + 1, "...", lastPage]);
    else pages.push(...getIndexes(diff, page + 1));
    return pages;
  };

  const setIntervalPage = () => {
    const left = pageInfo.offset;
    const right = pageInfo.offset + pageInfo.limit;
    return `${left} - ${pageInfo.total < right ? pageInfo.total : right}`;
  };

  return (
    <div>
      <Row
        justifyContent="center"
        gap="10px"
        alignItems="end"
        margin="0 20px 20px 20px"
        position="relative"
      >
        <PageInfo>
          {setIntervalPage()} z {pageInfo.total} rekordów
        </PageInfo>
        {getGroup().map((page, index) => {
          const key = `pagination${page}${index}`;
          if (page === pageInfo.number + 1)
            return (
              <CurrentPage padding="0 20px" disabled key={key}>
                {page}
              </CurrentPage>
            );
          if (page === "...") return <span key={key}>{page}</span>;
          return (
            <BtnSecondary
              padding="0 20px"
              title={`Wybierz stronę ${page}.`}
              key={key}
              onClick={() => changePage(Number((page as number) - 1))}
            >
              {page}
            </BtnSecondary>
          );
        })}
      </Row>
    </div>
  );
};

export default Pagination;
