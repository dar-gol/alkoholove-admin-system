import React from "react";
import { IndicatorContainer, IndicatorWrapper, Text } from "./Indicator.styled";

interface Props {
  size: number;
  onClick: () => void;
  icon?: string;
  text?: string;
  type: string;
}

const Indicator = ({ size, onClick, icon, text, type }: Props) => {
  const checkTextIcon = () => {
    if (icon) return <Text className={icon} typeColor={type} />;
    return <Text typeColor={type}>{text}</Text>;
  };

  return (
    <IndicatorContainer size={size}>
      <IndicatorWrapper typeColor={type} size={size - 10} onClick={onClick}>
        {checkTextIcon()}
      </IndicatorWrapper>
    </IndicatorContainer>
  );
};

export default Indicator;
