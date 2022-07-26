import React from 'react';
import { useFormContext } from 'react-hook-form';
import { IProps } from '../../@types/inputs';
import { Col, InputText, Label } from '../../styles/global.styled';

const DoubleInput = ({ name, title, required, placeholder }: IProps) => {
  const { register } = useFormContext();
  return (
    <Col>
      <Label>{title}:</Label>
      <InputText
        {...register(name, { required, valueAsNumber: true })}
        type="number"
        step="0.01"
        placeholder={`${placeholder} ${!required ? '(opcjonalne)' : ''}`}
        onKeyDown={(e: any) => e.key === 'Enter' && e.preventDefault()}
      />
    </Col>
  );
};

export default DoubleInput;
