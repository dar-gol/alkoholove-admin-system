import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Property, Type } from "../../@types/category";
import { IReportedReview } from "../../@types/reportedReview";
import { IUser } from "../../@types/users";
import Indicator from "../../components/Indicator/Indicator";
import {
  BtnSecondary,
  CapitalCase,
  Col,
  InfoBar,
  Key,
  ListContainer,
  ListTitle,
  ListWrapper,
  ScrollContent,
  Tuple,
  Value,
} from "../../styles/global.styled";
import { API, INPUT_CATEGORY, URL } from "../../utils/constant";
import useCategory from "../../utils/hooks/useCategory";
import useAuthReq from "../../utils/hooks/useReq";
import { getDate } from "../../utils/utils";
import { SectionBar } from "../AddAlcohol/addAlcohol.styled";

interface Props {
  onCollapse?: () => void;
  collapse?: boolean;
}

const CategoryDetails = ({
  onCollapse = () => {},
  collapse = undefined,
}: Props) => {
  const { id } = useParams();
  const { ctg, getCategory } = useCategory();
  const [category, setCategory] = useState<Property[] | null>(null);

  const initCategory = () => {
    const { core, additional } = getCategory(id || "", true);
    const properties = id === "core" ? core : additional;
    setCategory(properties.properties);
  };

  const translateType = (type: Type) => {
    const name = typeof type === "string" ? type : type[0];
    const required =
      typeof type === "string" || (typeof type !== "string" && type.length < 2);

    const label = INPUT_CATEGORY.find((input) => input.value === name);
    return {
      name: label?.label,
      required: required ? "TAK" : "NIE",
    };
  };

  useEffect(() => {
    initCategory();
  }, [id, ctg?.categories]);
  return (
    <ListContainer>
      <Indicator
        visible={collapse !== undefined}
        size={50}
        top="10px"
        left="-25px"
        onClick={onCollapse}
        icon={`icon-chevron-${collapse ? "right" : "left"}`}
        type="secondary"
      />
      <ListWrapper>
        <ListTitle>Szczegółowe informacje</ListTitle>
        <ScrollContent padding="0 30px">
          <InfoBar>
            <span className="icon-Info" />
            <p>
              Każda kategoria dziedziczy cechy z kategorii podstawowej (core).
            </p>
          </InfoBar>
          <Col>
            <Tuple>
              <Key>Nazwa kategorii </Key>
              <Value>{id}</Value>
            </Tuple>
            <Col margin="0 0 0 20px" visible={!!category?.length}>
              <Tuple padding="16px 0">
                <Key>Cechy specjalne kategorii </Key>
                <Value />
              </Tuple>
              {category?.map((prop) => {
                const { name, required } = translateType(
                  prop.metadata.bsonType
                );
                return (
                  <Col margin="0 0 0 20px">
                    <Tuple>
                      <Key>Nazwa właściwa </Key>
                      <Value>{prop.name}</Value>
                    </Tuple>
                    <Col margin="0 0 0 20px">
                      <Tuple>
                        <Key>Typ cechy </Key>
                        <Value>
                          <CapitalCase>{name}</CapitalCase>
                        </Value>
                      </Tuple>
                      <Tuple>
                        <Key>Wymagana </Key>
                        <Value>
                          <CapitalCase>{required}</CapitalCase>
                        </Value>
                      </Tuple>
                      <Tuple>
                        <Key>Wyświetlana nazwa </Key>
                        <Value>
                          <CapitalCase>{prop.metadata.title}</CapitalCase>
                        </Value>
                      </Tuple>
                      <Tuple>
                        <Key>Placeholder cechy </Key>
                        <Value>{prop.metadata.description}</Value>
                      </Tuple>
                    </Col>
                  </Col>
                );
              })}
            </Col>
          </Col>
        </ScrollContent>
      </ListWrapper>
    </ListContainer>
  );
};

export default CategoryDetails;
