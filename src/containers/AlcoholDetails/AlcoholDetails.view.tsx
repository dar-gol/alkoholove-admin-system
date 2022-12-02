import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAlcohol from "../../utils/hooks/useAlcohol";
import Breadcrumb from "../../components/Breadcrumb/breadcrumb";
import HeaderLogic from "../../components/Header/header.logic";
import { API, CORE, URL } from "../../utils/constant";
import { createImageName } from "../../utils/utils";
import {
  BtnPrimary,
  BtnSecondary,
  CapitalCase,
  Col,
  Container,
  Key,
  LinkPrimary,
  ListContainer,
  ListTitle,
  ListWrapper,
  Row,
  ScrollContent,
  Tuple,
  Value,
  WarnText,
} from "../../styles/global.styled";
import { Title } from "../AddAlcohol/addAlcohol.styled";
import Modal from "../../components/modal/Modal";
import { ModalTitle } from "../../components/modal/Modal.styled";
import useAuthReq from "../../utils/hooks/useReq";
import Indicator from "../../components/Indicator/Indicator";
import { AlcoholImage } from "./alcoholDetails.styled";

const formater = (value: any): string | string[] => {
  if (value === null || (typeof value === "object" && value.length === 0))
    return "Brak danych*";
  if (typeof value === "object" && value !== null) return value.join(" | ");
  if (typeof value === "boolean") return value ? "TAK" : "NIE";
  return value;
};

interface Props {
  onCollapse?: () => void;
  collapse?: boolean;
}

const AlcoholDetails = ({
  onCollapse = () => {},
  collapse = undefined,
}: Props) => {
  const { alcoholBarcode } = useParams();
  const alcohol = useAlcohol(alcoholBarcode || "");
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { send } = useAuthReq(
    "DELETE",
    `${API}${URL.POST_ALCOHOLS}/${alcohol?.id}`,
    null
  );

  const remove = async () => {
    await send({});
    navigate("/alcohol");
  };

  const createTuple = (display_name: string, value: any) => {
    const formatValue = formater(value);
    const createValue = () => <Value>{formatValue}</Value>;
    return (
      <Tuple key={display_name}>
        <Key>
          <CapitalCase>{display_name}</CapitalCase>
        </Key>
        {createValue()}
      </Tuple>
    );
  };

  const coreValues =
    alcohol &&
    CORE.map(({ name, display_name }) =>
      createTuple(display_name, alcohol[name as keyof typeof alcohol])
    );

  const additionalValues =
    alcohol &&
    alcohol.additional_properties.map(({ display_name, value }) =>
      createTuple(display_name, value)
    );

  useEffect(() => {}, []);

  return (
    <>
      {alcohol && (
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
              <Row justifyContent="center">
                <Col>
                  <AlcoholImage
                    src={`${URL.GET_IMAGE}/${createImageName(
                      alcohol?.id.toLowerCase() || "",
                      "md"
                    )}`}
                    alt="Zdjęcie przedstawiające wybrany alkohol"
                  />
                </Col>
              </Row>
              <Col>
                {coreValues} {additionalValues}
              </Col>
              <Row justifyContent="flex-end" gap="20px" margin="20px 0 0 0">
                <BtnPrimary
                  padding="0 20px"
                  onClick={() =>
                    navigate(`/edit/alcohol/${alcohol.barcode[0]}`)
                  }
                >
                  Edytuj alkohol
                </BtnPrimary>
                <BtnSecondary padding="0 20px" onClick={() => setIsOpen(true)}>
                  Usuń alkohol
                </BtnSecondary>
              </Row>
            </ScrollContent>
          </ListWrapper>
        </ListContainer>
      )}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalTitle>Usuwanie alkoholu</ModalTitle>
        <WarnText>
          Czy na pewno chcesz permanentnie usunąć ten alkohol?
        </WarnText>
        <Col>
          <Tuple>
            <Key>ID</Key>
            <Value>{alcohol?.id}</Value>
          </Tuple>
          <Tuple>
            <Key>Nazwa</Key>
            <Value>{alcohol?.name}</Value>
          </Tuple>
        </Col>
        <Col margin="20px 0 0 0" justifyContent="center" gap="30px">
          <BtnSecondary onClick={() => remove()}>
            Tak, chcę permanentnie usunąć alkohol
          </BtnSecondary>
          <BtnPrimary onClick={() => setIsOpen(false)}>
            Nie, nie chcę permanentnie usunąć alkohol
          </BtnPrimary>
        </Col>
      </Modal>
    </>
  );
};

export default AlcoholDetails;
