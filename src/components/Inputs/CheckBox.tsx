import React, { useEffect, useState } from "react";

import {
  CheckBoxContainer,
  Icon,
  IconWrapper,
  Indicator,
} from "./CheckBox.styled";

interface Props {
  leftIcon: string;
  leftColor: string;
  rightIcon: string;
  rightColor: string;
  isActive: boolean;
  [k: string]: any;
}

const CheckBox: React.FC<Props> = ({
  children,
  leftIcon,
  rightIcon,
  leftColor,
  rightColor,
  isActive,
  ...rest
}) => (
  <CheckBoxContainer
    className={isActive ? "active" : ""}
    {...rest}
    role="button"
  >
    <Indicator color={isActive ? rightColor : leftColor}>
      <Icon className={isActive ? rightIcon : leftIcon} />
    </Indicator>
    <IconWrapper>
      <Icon className={leftIcon} />
    </IconWrapper>
    <IconWrapper>
      <Icon className={rightIcon} />
    </IconWrapper>
  </CheckBoxContainer>
);

export default CheckBox;
