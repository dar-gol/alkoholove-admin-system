import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Creatable from 'react-select/creatable';
import { IProps } from '../../@types/inputs';
import { Col, Label } from '../../styles/global.styled';

const Select = ({ title, name, required, placeholder }: IProps) => {
  const { control } = useFormContext();
  return (
    <Col flex="1">
      <Label>{title}:</Label>
      <Controller
        name={name}
        control={control}
        rules={{ required }}
        render={({ field }) => (
          <Creatable
            {...field}
            isClearable
            placeholder={`${placeholder} ${!required ? '(opcjonalne)' : ''}`}
            isMulti
          />
        )}
      />
    </Col>
  );
};

export default Select;
