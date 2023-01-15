import React, { useEffect, useState } from "react";
import { Icon } from "../../styles/global.styled";
import { autoCompleteHandler } from "../../utils/utils";
import { CustomInputProps, RightIcon, Type } from "./ICustomInput";
import {
  Input,
  InputContainer,
  InputWrapper,
  Label,
  Error,
  TextArea,
} from "./TextInput.styled";

const TextInput: React.FC<CustomInputProps> = ({
  placeholder,
  error,
  state,
  icon,
  isAutoCompleted,
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

  useEffect(() => {
    if (isAutoCompleted) autoCompleteHandler(() => setType("written"));
  }, []);

  useEffect(() => {
    setType(stateHandler());
    setRightIcon(stateRightIcon());
  }, [state, rest.value, active]);

  const textAreaAdjust = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const element = event.currentTarget;
    const parent = element.parentElement?.parentElement;
    element.style.height = "1px";
    element.style.height = `${35 + element.scrollHeight}px`;
    if (parent) {
      parent.style.minHeight = element.style.height;
      const grandParent = parent.parentElement;
      if (grandParent) {
        grandParent.style.minHeight = element.style.height;
      }
    }
  };

  const getPlaceholder = () => (active ? placeholder : "");

  const getInputType = () => {
    if (rest.type === "textarea")
      return (
        <TextArea
          {...rest}
          placeholder={getPlaceholder()}
          onKeyUp={(event) => textAreaAdjust(event)}
        />
      );
    return <Input {...rest} placeholder={getPlaceholder()} />;
  };
  return (
    <InputContainer
      onFocus={activeHandler}
      onBlur={blurHandler}
      className={`${type} ${icon === "without" ? "without-icon" : ""}`}
    >
      <Icon className={`${icon || "icon-search"} left-icon`} />
      <InputWrapper>
        <Label>{rest.title}</Label>
        {getInputType()}
      </InputWrapper>
      <Icon className={`${rightIcon} right-icon`} />
      <Error className="error">{error}</Error>
    </InputContainer>
  );
};

export default TextInput;
