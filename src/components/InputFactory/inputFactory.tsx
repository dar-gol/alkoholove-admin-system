import React from "react";
import { useTheme } from "styled-components";
import { IFactory } from "../../@types/inputs";
import { Row } from "../../styles/global.styled";
import BoolInput from "../BoolInput/boolInput";
import CategorySelect from "../Inputs/CategorySelect";
import CheckBox from "../Inputs/CheckBox";
import MultiInput from "../Inputs/MultiInput";
import Select from "../Inputs/Select";
import TextInput from "../Inputs/TextInput";
import MoreInput from "../MoreInput/moreInput";
import DoubleInput from "../SimpleInput/DoubleInput";
import NumberInput from "../SimpleInput/NumberInput";
import Textarea from "../SimpleInput/Textarea";

const InputFactory = ({
  name,
  title,
  type,
  required,
  placeholder,
  ...rest
}: IFactory) => {
  const theme = useTheme() as { palette: { [k: string]: string } };
  if (name === "description")
    return (
      <TextInput
        type="textarea"
        icon=""
        state=""
        error=""
        title={title}
        required={false}
        placeholder={placeholder}
        {...rest}
      />
    );
  if (type === "string")
    return (
      <Select
        type="creatable"
        name={name}
        title={title}
        required={false}
        placeholder={title}
        options={[]}
        {...rest}
      />
    );
  if (type === "array" && name === "barcode") return <MultiInput {...rest} />;
  if (type === "array")
    return (
      <Select
        type="creatable"
        name={name}
        title={title}
        required={false}
        placeholder={title}
        isMulti
        options={[]}
        {...rest}
      />
    );
  if (type === "bool")
    return (
      <Row>
        <CheckBox
          name={name}
          title={title}
          required={false}
          rightIcon="icon-success"
          rightColor={theme.palette.Green80}
          leftColor={theme.palette.Grey20}
          backgroundColor={theme.palette.Grey5}
          {...rest}
          value={rest.value || false}
          onClick={() => rest.setValue(!rest.value)}
        />
      </Row>
    );
  if (type === "int" || type === "long")
    return (
      <TextInput
        state=""
        error=""
        type="number"
        name={name}
        title={title}
        required={false}
        placeholder={placeholder}
        {...rest}
      />
    );
  if (type === "double")
    return (
      <TextInput
        state=""
        error=""
        type="number"
        step="0.01"
        name={name}
        title={title}
        required={false}
        placeholder={placeholder}
        {...rest}
      />
    );
  return <div />;
};

export default InputFactory;
