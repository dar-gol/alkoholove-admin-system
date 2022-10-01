import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Alcohols } from "../../@types/alcohol";
import { IPageInfo } from "../../@types/pagination";
import { IListHandlers } from "../../components/List/List.view";
import useQueryParams from "../../utils/hooks/useQueryParams";

import AlcoholListView from "./AlcoholListView";

const options: { label: string; value: number }[] = [
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

interface Props {
  updateKind: (kind: string | null) => void;
  listRef: React.RefObject<IListHandlers>;
}

const AlcoholListLogic = ({ updateKind, listRef }: Props) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedKind, setSelectedKind] = useState<string | null>(null);
  const [selectedRowOnPage, setSelectedRowsOnPage] = useState<
    | {
        label: string;
        value: number;
      }
    | null
    | undefined
  >(null);
  const { query, updateParam } = useQueryParams();
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const width = document.body.clientWidth;
  const isSmallScreen = () => width < 1200 && !!params.alcoholBarcode;
  const [collapse, setCollapse] = useState<boolean>(isSmallScreen());
  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const onClickSearch = (value: string, kind?: string) => {
    updateParam("search", value);
    // handleSearch(value, kind);
  };

  const onSelectedKind = (selected: { label: string; value: string }) => {
    if (selected.value === "-") {
      setSelectedKind(null);
      updateKind(null);
      navigate(`/alcohol${location.search}`);
    } else {
      setSelectedKind(selected.value);
      navigate(`/alcohol/${selected.value}${location.search}`);
      updateKind(selected.value);
    }
  };

  const onRowsOnPage = (selected: unknown) => {
    const item = selected as { label: string; value: number };
    setSelectedRowsOnPage(item);
    updateParam("limit", item.value);
  };

  const goToAlcoholDetails = (id: string, kind: string) => {
    navigate(`/alcohol/${kind}/${id}${location.search}`);
  };

  const onCollapse = () => {
    if (isSmallScreen()) {
      onSelectedKind({
        label: selectedKind || "",
        value: selectedKind || "",
      });
    }
    setCollapse((prev) => !prev);
  };

  const isDetail = () => !!params.alcoholBarcode;

  useEffect(() => {
    const { search, limit } = query;
    const { kind } = params;
    setSearchValue(search || "");
    if (limit) {
      const option = options.find((c) => c.value === Number(limit));
      setSelectedRowsOnPage(option);
    }
    if (kind) {
      setSelectedKind(kind);
      // updateKind(kind);
    }
    if (search || kind) {
      setTimeout(() => {
        // handleSearch(search, kind);
      }, 1000);
    }
  }, []);

  useEffect(() => {
    if (isSmallScreen()) setCollapse(true);
  }, [params.alcoholBarcode]);

  return (
    <AlcoholListView
      selectedKind={selectedKind}
      onSelectedKind={onSelectedKind}
      goToAlcoholDetails={goToAlcoholDetails}
      collapse={collapse}
      onCollapse={onCollapse}
      isDetail={isDetail}
      listRef={listRef}
    />
  );
};

export default AlcoholListLogic;
