import React, { useCallback, useEffect } from "react";

import {
  CheckBoxContainer,
  Container,
  Icon,
  IconWrapper,
  Indicator,
  Text,
} from "./CheckBox.styled";

interface Props {
  leftIcon?: string;
  leftColor: string;
  rightIcon?: string;
  rightColor: string;
  backgroundColor?: string;
  initialState?: boolean;
  text?: string;
  [k: string]: any;
}

const Toggle: React.FC<Props> = ({
  leftIcon,
  rightIcon,
  leftColor,
  rightColor,
  backgroundColor,
  title,
  ...rest
}) => {
  const handleSpace = (e: any) => {
    if (
      e.code === "Space" &&
      [...e.target.classList].includes(
        `checkBoxComponent${encodeURIComponent(title)}`
      )
    ) {
      e.preventDefault();
      rest.onClick(e);
    }
  };
  const handleKeyUp = useCallback(
    (event: any) => {
      handleSpace(event);
    },
    [handleSpace]
  );

  useEffect(() => {
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyUp]);
  return (
    <Container
      className={`checkBoxComponent${encodeURIComponent(title)}`}
      color={backgroundColor}
      {...rest}
      role="checkbox"
      title={title}
      tabIndex={0}
    >
      <CheckBoxContainer
        className={rest.value ? "active" : ""}
        height="40px"
        width="74px"
      >
        <Indicator color={rest.value ? rightColor : leftColor}>
          <Icon className={rest.value ? rightIcon || "" : leftIcon || ""} />
        </Indicator>
        <IconWrapper>
          <Icon className={leftIcon || ""} />
        </IconWrapper>
        <IconWrapper>
          <Icon className={rightIcon || ""} />
        </IconWrapper>
      </CheckBoxContainer>
      {title && <Text>{title}</Text>}
    </Container>
  );
};
export default Toggle;
