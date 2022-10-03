import React, { useEffect, useRef, useState } from "react";
import AlcoholListLogic from "./AlcoholList.logic";
import useQueryParams from "../../utils/hooks/useQueryParams";
import { IListHandlers } from "../../components/List/List.view";

const AlcoholListApollo = () => {
  const listRef = useRef<IListHandlers>(null);
  const { updateParam } = useQueryParams();

  const updateKind = (kind: string | null) => {
    listRef.current?.fireSearch(null, kind);
  };

  useEffect(() => {
    if (listRef.current?.getContent() !== null) return;

    updateParam("offset", 0);
  }, [listRef.current?.getContent()]);

  return <AlcoholListLogic updateKind={updateKind} listRef={listRef} />;
};

export default AlcoholListApollo;
