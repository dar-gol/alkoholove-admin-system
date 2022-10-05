import React from "react";
import { IndicatorContainer, IndicatorWrapper, Text } from "./Indicator.styled";

interface Props {
  size: number;
  onClick: () => void;
  icon?: string;
  text?: string;
  type: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  visible?: boolean;
  isPressCursor?: boolean;
}

const Indicator = ({
  size,
  onClick,
  icon,
  text,
  type,
  visible = true,
  isPressCursor = true,
  ...position
}: Props) => {
  const checkTextIcon = () => {
    if (icon) return <Text className={icon} typeColor={type} />;
    return <Text typeColor={type}>{text}</Text>;
  };

  return (
    <IndicatorContainer size={size} {...position} visible={visible}>
      <IndicatorWrapper
        isPressCursor={isPressCursor}
        typeColor={type}
        size={size - 10}
        onClick={onClick}
      >
        {checkTextIcon()}
      </IndicatorWrapper>
    </IndicatorContainer>
  );
};

export default Indicator;
