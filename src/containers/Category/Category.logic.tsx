import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Property } from "../../@types/category";
import { IListHandlers } from "../../components/List/List.view";
import CategoryView from "./Category.view";

interface Props {
  listRef: React.RefObject<IListHandlers>;
}

const width = document.body.clientWidth;

const CategoryLogic = ({ listRef }: Props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isSmallScreen = () => width < 1200 && !!id;
  const [collapse, setCollapse] = useState<boolean>(isSmallScreen());

  const onCollapse = () => {
    if (isSmallScreen()) {
      setCollapse(false);
      navigate(`/category${location.search}`);
      return;
    }
    setCollapse((prev) => !prev);
  };

  const goToCategoryDetails = (index?: string) => {
    setCollapse(width < 1200);
    navigate(`/category${index ? `/${index}` : ""}`);
  };

  const propertiesName = (props: Property[]): string[] =>
    props.map((prop) => prop.name).filter((name) => name !== "kind");

  const drawPropertiesNames = (props: Property[]): string => {
    const text = propertiesName(props).join(", ");
    return text === "" ? "Brak dodatkowych właściwości" : text;
  };

  return (
    <CategoryView
      listRef={listRef}
      id={id}
      collapse={collapse}
      onCollapse={onCollapse}
      goToCategoryDetails={goToCategoryDetails}
      drawPropertiesNames={drawPropertiesNames}
    />
  );
};

export default CategoryLogic;
