import React, { useEffect, useRef, useState } from "react";
import LoadingModal from "../../components/modal/LoadingModal";
import useAlcohols from "../../utils/hooks/useContents";
import AlcoholListLogic from "./AlcoholList.logic";
import useQueryParams from "../../utils/hooks/useQueryParams";
import { API, URL } from "../../utils/constant";
import { IListHandlers } from "../../components/List/List.view";

const initalReq = [
  "POST",
  `${API}${URL.SEARCH_ALCOHOLS}?limit=10&offset=0`,
  null,
  {
    accept: "application/json",
    "Content-Type": "application/json",
  },
] as const;

const AlcoholListApollo = () => {
  const listRef = useRef<IListHandlers>(null);
  const { updateParam } = useQueryParams();

  const updateKind = (kind: string | null) => {
    listRef.current?.fireSearch(null, kind);
  };

  useEffect(() => {
    if (listRef.current?.getContent() !== null) return;

    updateParam("offset", 0);
    updateParam("limit", 10);
    listRef.current?.fireChangePage(0);
  }, [listRef.current?.getContent()]);

  return <AlcoholListLogic updateKind={updateKind} listRef={listRef} />;
};

export default AlcoholListApollo;
