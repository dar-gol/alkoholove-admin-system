import React from "react";
import { IListHandlers } from "../../components/List/List.view";
import CategoryView from "./Category.view";

interface Props {
  listRef: React.RefObject<IListHandlers>;
}

const CategoryLogic = ({ listRef }: Props) => {
  const t = 0;
  return <CategoryView listRef={listRef} />;
};

export default CategoryLogic;
