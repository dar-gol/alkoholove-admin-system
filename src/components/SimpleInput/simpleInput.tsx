import React from 'react';
import { useFormContext } from 'react-hook-form';
import { IProps } from '../../@types/inputs';
import { Col, InputText } from '../../styles/global.styled';

const SimpleInput = ({ name, show_name }: IProps) => {
  const { register } = useFormContext();
  return (
    <Col>
      <p>{show_name}:</p>
      <InputText {...register(name)} />
    </Col>
  );
};

export default SimpleInput;
