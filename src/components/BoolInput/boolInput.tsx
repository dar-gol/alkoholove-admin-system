import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Select from 'react-select';
import { IProps } from '../../@types/inputs';

const BoolInput = ({ name, title, required }: IProps) => {
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
      <p>{title}:</p>
      <Controller
        name={name}
        control={control}
        rules={{ required }}
        render={({ field }) => (
          <Select
            {...field}
            isClearable
            placeholder="Wybierz wartość"
            options={options}
          />
        )}
      />
    </div>
  );
};

export default BoolInput;
