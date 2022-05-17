import React from 'react';
import { useFormContext } from 'react-hook-form';
import { IProps } from '../../@types/inputs';

const SimpleInput = ({ name, show_name }: IProps) => {
  const { register } = useFormContext();
  return (
    <div>
      <p>{show_name}:</p>
      <input {...register(name)} />
    </div>
  );
};

export default SimpleInput;
