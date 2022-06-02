import React from "react";
import { useFormContext } from "react-hook-form";
import { IProps } from "../../@types/inputs";
import { Col, InputText } from "../../styles/global.styled";

const TextInput = ({
  name,
  title,
  required,
  type,
}: IProps & { type?: string }) => {
  const { register } = useFormContext();
  return (
    <Col>
      <p>{title}:</p>
      <InputText {...register(name, { required })} type={type} />
    </Col>
  );
};

TextInput.defaultProps = { type: "text" };

export default TextInput;
