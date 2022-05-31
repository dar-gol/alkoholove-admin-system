import React, { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import ReactSelect from 'react-select';
import { Trash2, Edit } from 'react-feather';
import { useParams } from 'react-router-dom';
import { PropertyState } from '../../containers/AddCategory/addCategory';
import { BtnPrimary, Col, InputText, Row } from '../../styles/global.styled';
import { INPUT_CATEGORY } from '../../utils/constant';
import { Property, BtnDelete, BtnEdit } from './propertyInput.styled';

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
  const { categoryName } = useParams();
  const { register, getValues } = useFormContext();
  const [name, setName] = useState<string>(traits.name || '');
  const [showMore, setShowMore] = useState<boolean>(!traits.isNew);
  const handleAddName = () => {
    const isName = addName(name, id);
    if (isName) {
      setShowMore(true);
    }
  };

  return (
    <>
      <Property gap="10px" flex="1">
        <p>Nazwa cechy (nie może zawierać spacji):</p>
        <Row gap="20px">
          <InputText
            disabled={!traits.isNew}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <BtnPrimary
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
                <p>Wybierz typ pola: </p>
                <PropertySelect name={name} disabled={!traits.isNew} />
              </Col>
              <Row
                gap="20px"
                flex="1"
                alignItems="center"
                justifyContent="flex-end"
              >
                <input
                  {...register(`${name}Required`)}
                  type="checkbox"
                  disabled={!!categoryName}
                />
                <p>Pole wymagane</p>
              </Row>
            </Row>
            <Row gap="20px">
              <Col flex="1">
                <p>Placeholder:</p>
                <InputText
                  {...register(`${name}Description`, { required: true })}
                  disabled={!traits.isNew}
                />
              </Col>
              <Col flex="1">
                <p>Wyświetlana nazwa:</p>
                <InputText
                  {...register(`${name}Title`, { required: true })}
                  disabled={!traits.isNew}
                />
              </Col>
            </Row>
          </>
        )}
        <BtnDelete
          type="button"
          onClick={() => deleteProperty(id)}
          hide={getValues(`${name}Required`) && !traits.isNew}
        >
          <Trash2 size={18} />
        </BtnDelete>
        <BtnEdit
          type="button"
          onClick={() => editProperty(id)}
          hide={getValues(`${name}Required`) || traits.isNew}
        >
          <Edit size={16} />
        </BtnEdit>
      </Property>
    </>
  );
};

export default PropertyInput;
