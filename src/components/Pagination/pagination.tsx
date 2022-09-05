import React, { useEffect, useState } from "react";
import {
  BtnPrimary,
  BtnSecondary,
  InputText,
  Row,
} from "../../styles/global.styled";
import useQueryParams from "../../utils/hooks/useQueryParams";
import { CurrentPage } from "./pagination.styled";

interface IProps {
  lastPage: number;
  offset: number;
  setOffset: (page: number) => void;
}

const Pagination: React.FC<IProps> = ({ lastPage, offset, setOffset }) => {
  const { query, updateParam } = useQueryParams();
  const getIndexes = (length: number, shift: number): number[] =>
    Array.from({ length }, (_, i) => i + shift);

  const changePage = (page: number) => {
    updateParam("offset", page);
    setOffset(page);
  };

  const getGroup = () => {
    const page = offset + 1;
    const diff = lastPage - page;
    const pages = [];
    if (page > 3) pages.push(...[1, "...", page - 1, page]);
    else pages.push(...getIndexes(page, 1));
    if (diff >= 3) pages.push(...[page + 1, "...", lastPage]);
    else pages.push(...getIndexes(diff, page + 1));
    return pages;
  };

  useEffect(() => {
    changePage(parseInt(query.offset, 10) || 0);
  }, []);

  return (
    <div>
      <Row justifyContent="center" gap="10px" alignItems="end">
        {getGroup().map((page, index) => {
          const key = `pagination${page}${index}`;
          if (page === offset + 1)
            return (
              <CurrentPage disabled key={key}>
                {page}
              </CurrentPage>
            );
          if (page === "...") return <span key={key}>{page}</span>;
          return (
            <BtnSecondary
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
