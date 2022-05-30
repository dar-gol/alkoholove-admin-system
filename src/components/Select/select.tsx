import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Creatable from 'react-select/creatable';
import { IProps } from '../../@types/inputs';
import { Col } from '../../styles/global.styled';

const Select = ({ title, name, required }: IProps) => {
  const { control } = useFormContext();
  return (
    <Col flex="1">
      <p>{title}:</p>
      <Controller
        name={name}
        control={control}
        rules={{ required }}
        render={({ field }) => (
          <Creatable
            {...field}
            isClearable
            placeholder="Wprowadz dane"
            isMulti
          />
        )}
      />
    </Col>
  );
};

export default Select;
