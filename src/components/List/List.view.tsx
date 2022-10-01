import React, { forwardRef, useImperativeHandle, useState } from "react";
import {
  BtnSecondary,
  Icon,
  ListTitle,
  ListWrapper,
  Row,
  ScrollContent,
} from "../../styles/global.styled";
import Pagination from "../Pagination/pagination";
import { CustomSelect } from "../Select/select.styled";
import TextInput from "../Inputs/TextInput";
import { Body, Header, Method, Url } from "../../@types/fetch";
import { ISelectValue } from "../Inputs/ICustomInput";
import { IPageInfo } from "../../@types/pagination";
import LoadingModal from "../modal/LoadingModal";
import useContents from "../../utils/hooks/useContents";
import { Table } from "./List.styled";

const options: ISelectValue<number>[] = [
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

type requestArray = [Method, Url, Body, Header?];

interface Props {
  additionalFilters?: React.ReactNode;
  contentRow: <T>(content: T) => React.ReactNode;

  handleSearch?: (searchValue: string) => void;

  listTitle: string;
  listObjectName: string;
  initSearchValue?: string;
  initReq: requestArray;

  isSearch?: boolean;
}

export interface IListHandlers {
  fireSearch: (input: string | null, kind?: string | null | undefined) => void;
  fireChangePage: (index: number) => void;
  fireChangePageSize: (limit: number) => void;
  getContent: () => unknown[] | null;
  getPage: () => IPageInfo | null;
  isLoading: () => boolean;
}

const List = forwardRef<IListHandlers, Props>(
  (
    {
      additionalFilters,
      contentRow,
      handleSearch,
      listObjectName,
      listTitle,
      initSearchValue = "",
      initReq,
      isSearch = true,
    }: Props,
    ref
  ) => {
    const { search, changePageSize, changePage, contents, page } = useContents(
      initReq,
      listObjectName
    );
    const [option, setOption] = useState<ISelectValue<number>>(options[0]);
    const [inputValue, setInputValue] = useState<string>(initSearchValue);

    useImperativeHandle(ref, () => ({
      fireSearch(input: string | null, kind?: string | null | undefined) {
        search(input, kind);
      },
      fireChangePage(index) {
        changePage(index);
      },
      fireChangePageSize(limit) {
        changePageSize(limit);
      },
      getContent<T>() {
        return contents as T;
      },
      getPage() {
        return page;
      },
      isLoading() {
        return contents === null || contents === undefined;
      },
    }));

    const changeTableSize = (value: ISelectValue<number>) => {
      changePageSize(value.value);
      setOption(value);
    };

    const handleBtnSearch = (value: string) => {
      if (handleSearch) handleSearch(value);
      search(value);
    };

    if (contents === null)
      return (
        <LoadingModal
          isOpen
          title="Proszę czekać. Przygotowywujemy stronę..."
        />
      );

    return (
      <ListWrapper>
        <ListTitle>{listTitle}</ListTitle>
        <Row margin="10px 20px" gap="10px" flexWrap="wrap" justifyContent="end">
          {additionalFilters || null}
          <Row flex="1" gap="10px" minWidth="250px" visible={isSearch}>
            <TextInput
              state=""
              placeholder="Wyszukaj alkohol"
              error=""
              value={inputValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setInputValue(e.target.value)
              }
            />
            <BtnSecondary
              width="56px"
              height="56px"
              onClick={() => handleBtnSearch(inputValue)}
            >
              <Icon className="icon-search" />
            </BtnSecondary>
          </Row>
          <Row minWidth="200px" justifyContent="end" minHeight="56px">
            <CustomSelect
              value={option}
              options={options}
              onChange={(value) =>
                changeTableSize(value as ISelectValue<number>)
              }
            />
          </Row>
        </Row>
        <ScrollContent>
          <Table>
            <tbody>{contents?.map((content) => contentRow(content))}</tbody>
          </Table>
        </ScrollContent>
        <Pagination
          lastPage={Math.ceil(page.total / page.limit)}
          pageInfo={page}
          setOffset={changePage}
        />
      </ListWrapper>
    );
  }
);

export default List;
