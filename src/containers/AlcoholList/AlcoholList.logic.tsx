import React from "react";
import { Alcohols } from "../../@types/alcohol";
import { IPageInfo } from "../../@types/pagination";

import AlcoholListView from "./AlcoholList.view";

interface Props {
  page: IPageInfo;
  categories: { label: string; value: string }[];
  alcohols: Alcohols;
  changePage: (page: number) => void;
}

const AlcoholListLogic = ({
  page,
  categories,
  alcohols,
  changePage,
}: Props) => {
  const t = 1;
  return (
    <AlcoholListView
      page={page}
      alcohols={alcohols}
      changePage={changePage}
      categories={categories}
    />
  );
};

export default AlcoholListLogic;
