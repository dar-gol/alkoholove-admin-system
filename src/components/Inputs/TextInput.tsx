import React, { useEffect, useState } from "react";
import { autoCompleteHandler } from "../../utils/utils";
import {
  Input,
  InputContainer,
  InputWrapper,
  Label,
  Icon,
  Error,
} from "./TextInput.styled";

type Type =
  | "default"
  | "default "
  | "default success"
  | "default error"
  | "default active"
  | "written"
  | "written "
  | "written success"
  | "written error"
  | "written active";
type RightIcon = "icon-Error" | "icon-Success" | "";

type State = "success" | "error" | "";

interface Props {
  state: State;
  placeholder: string;
  error: string;
  icon?: string;
  [k: string]: any;
}

const TextInput: React.FC<Props> = ({
  placeholder,
  error,
  state,
  children,
  icon,
  ...rest
}) => {
  const [type, setType] = useState<Type>("default");
  const [rightIcon, setRightIcon] = useState<RightIcon>("");
  const [active, setActive] = useState<boolean>(false);

  const activeHandler = () => setActive(true);
  const blurHandler = () => setActive(false);

  const stateRightIcon = (): RightIcon => {
    if (!active && state === "success") return "icon-Success";
    if (!active && state === "error") return "icon-Error";
    return "";
  };

  const stateHandler = (): Type => {
    if (active) return "written active";
    if (!active && rest.value) return `written ${state}`;
    if (!active && !rest.value) return `default ${state}`;
    return "default";
  };

  useEffect(() => autoCompleteHandler(() => setType("written")));

  useEffect(() => {
    setType(stateHandler());
    setRightIcon(stateRightIcon());
  }, [state, rest.value, active]);

  return (
    <InputContainer
      onFocus={activeHandler}
      onBlur={blurHandler}
      className={`${type}`}
    >
      <Icon className={`${icon || "icon-search"} left-icon`} />
      <InputWrapper>
        <Label>{placeholder}</Label>
        <Input {...rest} />
      </InputWrapper>
      <Icon className={`${rightIcon} right-icon`} />
      <Error className="error">{error}</Error>
    </InputContainer>
  );
};

export default TextInput;
