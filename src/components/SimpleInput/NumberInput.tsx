import React from 'react';
import { useFormContext } from 'react-hook-form';
import { IProps } from '../../@types/inputs';
import { Col, InputText, Label } from '../../styles/global.styled';

const NumberInput = ({ name, title, required, placeholder }: IProps) => {
  const { register } = useFormContext();
  return (
    <Col>
      <Label>{title}:</Label>
      <InputText
        {...register(name, { required, valueAsNumber: true })}
        type="number"
        step="1"
        placeholder={placeholder}
        onKeyDown={(e: any) => e.key === 'Enter' && e.preventDefault()}
      />
    </Col>
  );
};

export default NumberInput;
