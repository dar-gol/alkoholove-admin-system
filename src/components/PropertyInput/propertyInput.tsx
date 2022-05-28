import React, { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import ReactSelect from 'react-select';
import { BtnPrimary, Col, InputText, Row } from '../../styles/global.styled';
import { INPUT_CATEGORY } from '../../utils/constant';
import { Property, BtnDelete } from './propertyInput.styled';

interface IPropertySelect {
  name: string;
}

interface IPropertyInput {
  id: number;
  addName: (name: string, index: number) => boolean;
  deleteProperty: (index: number) => void;
}

const PropertySelect = ({ name }: IPropertySelect) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={`${name}BsonType`}
      control={control}
      rules={{ required: true }}
      render={({ field }) => (
        <ReactSelect
          {...field}
          isClearable
          placeholder="Wprowadz dane"
          options={INPUT_CATEGORY}
        />
      )}
    />
  );
};

const PropertyInput = ({ id, addName, deleteProperty }: IPropertyInput) => {
  const { register } = useFormContext();
  const [name, setName] = useState<string>('');
  const [showMore, setShowMore] = useState<boolean>(false);

  const handleAddName = () => {
    const isName = addName(name, id);
    console.log(isName);
    if (isName) {
      console.log('show more');
      setShowMore((prev) => true);
    }
  };

  useEffect(() => {
    console.log('update showMore', showMore);
  }, [showMore]);

  return (
    <>
      <Property gap="10px" flex="1">
        <p>Nazwa cechy (nie może zawierać spacji):</p>
        <Row gap="20px">
          <InputText
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <BtnPrimary type="button" onClick={handleAddName}>
            Dodaj nazwę cechy
          </BtnPrimary>
        </Row>
        {showMore && (
          <>
            <Row gap="20px">
              <Col flex="1">
                <p>Wybierz typ pola: </p>
                <PropertySelect name={name} />
              </Col>
              <Row
                gap="20px"
                flex="1"
                alignItems="center"
                justifyContent="flex-end"
              >
                <input {...register(`${name}Required`)} type="checkbox" />
                <p>Pole wymagane</p>
              </Row>
            </Row>
            <Row gap="20px">
              <Col flex="1">
                <p>Placeholder:</p>
                <InputText
                  {...register(`${name}Description`, { required: true })}
                />
              </Col>
              <Col flex="1">
                <p>Wyświetlana nazwa:</p>
                <InputText {...register(`${name}Title`, { required: true })} />
              </Col>
            </Row>
          </>
        )}
        <BtnDelete type="button" onClick={() => deleteProperty(id)}>
          -
        </BtnDelete>
      </Property>
    </>
  );
};

export default PropertyInput;
