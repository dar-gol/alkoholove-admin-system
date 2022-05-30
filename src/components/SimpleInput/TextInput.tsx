import React from 'react';
import { useFormContext } from 'react-hook-form';
import { IProps } from '../../@types/inputs';
import { Col, InputText } from '../../styles/global.styled';

const TextInput = ({ name, title, required }: IProps) => {
  const { register } = useFormContext();
  return (
    <Col>
      <p>{title}:</p>
      <InputText {...register(name, { required })} />
    </Col>
  );
};

export default TextInput;
