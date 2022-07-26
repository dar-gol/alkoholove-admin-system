import React from 'react';
import { useFormContext } from 'react-hook-form';
import { IProps } from '../../@types/inputs';
import { Col, InputText, Label } from '../../styles/global.styled';

const TextInput = ({
  name,
  title,
  required,
  type,
  placeholder,
}: IProps & { type?: string }) => {
  const { register } = useFormContext();
  return (
    <Col>
      <Label>{title}:</Label>
      <InputText
        {...register(name, { required })}
        type={type}
        placeholder={`${placeholder} ${!required ? '(opcjonalne)' : ''}`}
        onKeyDown={(e: any) => e.key === 'Enter' && e.preventDefault()}
      />
    </Col>
  );
};

TextInput.defaultProps = { type: 'text' };

export default TextInput;
