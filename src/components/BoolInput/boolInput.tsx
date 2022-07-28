import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Select from 'react-select';
import { IProps } from '../../@types/inputs';
import { Label } from '../../styles/global.styled';

const BoolInput = ({ name, title, required, placeholder }: IProps) => {
  const { control } = useFormContext();
  const options = [
    {
      label: 'Tak',
      value: true,
    },
    {
      label: 'Nie',
      value: false,
    },
  ];
  return (
    <div>
      <Label>{title}:</Label>
      <Controller
        name={name}
        control={control}
        rules={{ required }}
        render={({ field }) => (
          <Select
            {...field}
            isClearable
            placeholder={placeholder}
            options={options}
          />
        )}
      />
    </div>
  );
};

export default BoolInput;
