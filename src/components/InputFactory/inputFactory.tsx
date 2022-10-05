import React from "react";
import { IFactory } from "../../@types/inputs";
import BoolInput from "../BoolInput/boolInput";
import CategorySelect from "../Inputs/CategorySelect";
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
  if (name === "description")
    return (
      <TextInput
        type="textarea"
        icon=""
        state=""
        error=""
        title={title}
        required={false}
        placeholder={title}
        {...rest}
      />
    );
  if (type === "string")
    return (
      <TextInput
        state=""
        error=""
        name={name}
        title={title}
        required={false}
        placeholder={title}
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
      <Select
        name={name}
        title={title}
        required={false}
        placeholder={title}
        options={[
          { label: "TAK", value: true },
          { label: "NIE", value: false },
        ]}
        {...rest}
      />
      // <BoolInput
      // name={name}
      // title={title}
      // required={false}
      // placeholder={placeholder}
      // {...rest}
      // />
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
        placeholder={title}
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
        placeholder={title}
        {...rest}
      />
    );
  return <div />;
};

export default InputFactory;
