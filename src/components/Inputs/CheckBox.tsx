import React, { useEffect, useState } from "react";

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

const CheckBox: React.FC<Props> = ({
  leftIcon,
  rightIcon,
  leftColor,
  rightColor,
  backgroundColor,
  initialState,
  text,
  ...rest
}) => {
  const [active, setActive] = useState<boolean>(initialState || false);
  const onClick = (e: React.MouseEvent) => {
    setActive((prev) => !prev);
    rest.onClick?.(e);
  };
  useEffect(() => {
    if (initialState !== active) setActive(initialState || false);
  }, [initialState]);
  console.log({ initialState, active });
  return (
    <Container color={backgroundColor}>
      <CheckBoxContainer
        className={active ? "active" : ""}
        {...rest}
        onClick={onClick}
        role="button"
        height="40px"
        width="74px"
      >
        <Indicator color={active ? rightColor : leftColor}>
          <Icon className={active ? rightIcon || "" : leftIcon || ""} />
        </Indicator>
        <IconWrapper>
          <Icon className={leftIcon || ""} />
        </IconWrapper>
        <IconWrapper>
          <Icon className={rightIcon || ""} />
        </IconWrapper>
      </CheckBoxContainer>
      {text && <Text>{text}</Text>}
    </Container>
  );
};
export default CheckBox;
