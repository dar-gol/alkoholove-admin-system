import React, { useEffect, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";
import { IProps } from "../../@types/inputs";
import {
  BtnPrimary,
  BtnSecondary,
  Col,
  InputText,
  Label,
  Row,
} from "../../styles/global.styled";
import { Type } from "./ICustomInput";
import { StyledMultiInput } from "./MultiInput.styled";

interface Props {
  [k: string]: any;
}

const MultiInput = ({ ...rest }) => {
  const [type, setType] = useState<Type>("default");
  const [active, setActive] = useState<boolean>(false);

  const activeHandler = () => setActive(true);
  const blurHandler = () => setActive(false);

  const stateHandler = (): Type => {
    if (active) return "written active";
    if (!active && rest.value) return `written`;
    if (!active && !rest.value) return `default`;
    return "default";
  };

  useEffect(() => {
    setType(stateHandler());
  }, [rest.value, active]);

  return (
    <StyledMultiInput
      onFocus={activeHandler}
      onBlur={blurHandler}
      className={`${type}`}
      placeholder="Wpisz kody kreskowe produktu"
      options={[]}
      isClearable
      isMulti
      {...rest}
    />
  );
};

export default MultiInput;
