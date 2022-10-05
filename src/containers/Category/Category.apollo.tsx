import React, { useRef } from "react";
import { IListHandlers } from "../../components/List/List.view";
import CategoryLogic from "./Category.logic";

const CategoryApollo = () => {
  const listRef = useRef<IListHandlers>(null);

  return <CategoryLogic listRef={listRef} />;
};

export default CategoryApollo;
