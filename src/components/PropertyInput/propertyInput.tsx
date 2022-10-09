import React, { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import ReactSelect from "react-select";
import { Trash2, Edit } from "react-feather";
import { useParams } from "react-router-dom";
import { useTheme } from "styled-components";
import { PropertyState } from "../../containers/AddCategory/addCategory";
import {
  BtnPrimary,
  Col,
  InputText,
  Row,
  WarnBar,
} from "../../styles/global.styled";
import { INPUT_CATEGORY } from "../../utils/constant";
import { Property, BtnDelete, BtnEdit } from "./propertyInput.styled";
import TextInput from "../Inputs/TextInput";
import Indicator from "../Indicator/Indicator";
import Select from "../Inputs/Select";
import CheckBox from "../Inputs/CheckBox";

interface IPropertySelect {
  name: string;
  disabled: boolean;
}

interface IPropertyInput {
  id: number;
  addName: (name: string, index: number) => boolean;
  deleteProperty: (index: number) => void;
  editProperty: (index: number) => void;
  traits: PropertyState;
}

const PropertySelect = ({ name, disabled }: IPropertySelect) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={`${name}BsonType`}
      control={control}
      rules={{ required: true }}
      render={({ field }) => (
        <ReactSelect
          {...field}
          isDisabled={disabled}
          isClearable
          placeholder="Wprowadz dane"
          options={INPUT_CATEGORY}
        />
      )}
    />
  );
};

const PropertyInput = ({
  id,
  addName,
  deleteProperty,
  traits,
  editProperty,
}: IPropertyInput) => {
  const theme = useTheme() as { palette: { [k: string]: string } };
  const { categoryName } = useParams();
  const { register, getValues, control, setValue } = useFormContext();
  const [name, setName] = useState<string>(traits.name || "");
  const [showMore, setShowMore] = useState<boolean>(!traits.isNew);
  const handleAddName = () => {
    const isName = addName(name, id);
    if (isName) {
      setShowMore(true);
    }
  };

  return (
    <>
      <Property gap="20px" flex="1">
        <WarnBar margin="0 0 0 0">
          <span className="icon-Error" />
          <p>
            Pamiętaj nazwa cechy nie powinna zawierać spacji oraz znaków
            specjalnych.
          </p>
        </WarnBar>
        <Row gap="20px">
          <TextInput
            disabled={!traits.isNew}
            error=""
            state=""
            title="Nazwa cechy"
            placeholder="color"
            type="text"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
          <BtnPrimary
            width="200px"
            type="button"
            onClick={handleAddName}
            disabled={!traits.isNew}
          >
            Dodaj nazwę cechy
          </BtnPrimary>
        </Row>
        {showMore && (
          <>
            <Row gap="20px">
              <Col flex="1">
                <Controller
                  name={`${name}BsonType`}
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      name={`${name}BsonType`}
                      isDisabled={!traits.isNew}
                      isClearable
                      placeholder="Wybierz typ cechy"
                      options={INPUT_CATEGORY}
                    />
                  )}
                />
              </Col>
              <Row>
                <Controller
                  name={`${name}Required`}
                  control={control}
                  render={({ field }) => (
                    <CheckBox
                      {...field}
                      onClick={() => {
                        setValue(`${name}Required`, !field.value);
                      }}
                      value={field.value}
                      backgroundColor={theme.palette.Grey5}
                      name={`${name}Required`}
                      rightIcon="icon-success"
                      rightColor={theme.palette.Green80}
                      leftColor={theme.palette.Grey20}
                      title="Cecha wymagana"
                    />
                  )}
                />
              </Row>
            </Row>
            <Row gap="10px">
              <Row flex="1">
                <Controller
                  name={`${name}Placeholder`}
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextInput
                      {...field}
                      state=""
                      error=""
                      title="Placeholder"
                      placeholder="Czerwony"
                      disabled={!traits.isNew}
                    />
                  )}
                />
              </Row>
              <Row flex="1">
                <Controller
                  name={`${name}Title`}
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextInput
                      {...field}
                      state=""
                      error=""
                      title="Wyświetlana nazwa"
                      placeholder="Kolor"
                      disabled={!traits.isNew}
                    />
                  )}
                />
              </Row>
            </Row>
          </>
        )}
        <Indicator
          icon="icon-Exit"
          size={35}
          onClick={() => deleteProperty(id)}
          type="red"
          top="25px"
          right="-17.5px"
        />
      </Property>
    </>
  );
};

export default PropertyInput;
