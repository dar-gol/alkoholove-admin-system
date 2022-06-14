import React from 'react';
import { useFormContext } from 'react-hook-form';
import { IProps } from '../../@types/inputs';
import { Col, InputText } from '../../styles/global.styled';

const DoubleInput = ({ name, title, required, placeholder }: IProps) => {
  const { register } = useFormContext();
  return (
    <Col>
      <p>{title}:</p>
      <InputText
        {...register(name, { required, valueAsNumber: true })}
        type="number"
        step="0.01"
        placeholder={placeholder}
      />
    </Col>
  );
};

export default DoubleInput;
