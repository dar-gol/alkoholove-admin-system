import React from 'react';
import { useFormContext } from 'react-hook-form';
import { IProps } from '../../@types/inputs';
import { Col, InputText, Label } from '../../styles/global.styled';
import { TextArea } from './simpleInput.styled';

const Textarea = ({
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
      <TextArea
        {...register(name, { required })}
        placeholder={placeholder}
        onKeyDown={(e: any) => e.key === 'Enter' && e.preventDefault()}
      />
    </Col>
  );
};

Textarea.defaultProps = { type: 'text' };

export default Textarea;
