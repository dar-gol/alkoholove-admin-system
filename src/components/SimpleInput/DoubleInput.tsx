import React from 'react';
import { useFormContext } from 'react-hook-form';
import { IProps } from '../../@types/inputs';
import { Col, InputText } from '../../styles/global.styled';

const DoubleInput = ({ name, title, required }: IProps) => {
  const { register } = useFormContext();
  return (
    <Col>
      <p>{title}:</p>
      <InputText
        {...register(name, { required, valueAsNumber: true })}
        type="number"
        step="0.01"
      />
    </Col>
  );
};

export default DoubleInput;
