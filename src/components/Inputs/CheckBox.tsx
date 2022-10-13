import React, { useCallback, useEffect, useState } from "react";
import { useTheme } from "styled-components";
import { Icon } from "../../styles/global.styled";

import { CheckBoxWrapper, Container, Text } from "./CheckBox.styled";

interface Props {
  backgroundColor?: string;
  title: string;
  [k: string]: any;
}

const CheckBox: React.FC<Props> = ({ backgroundColor, title, ...rest }) => {
  const theme = useTheme() as { palette: { [k: string]: string } };
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
      <CheckBoxWrapper className={rest.value ? "active" : ""}>
        <Icon
          visible={!!rest.value}
          className="icon-success"
          color={theme.palette.Secondary60}
        />
      </CheckBoxWrapper>
      {title && <Text>{title}</Text>}
    </Container>
  );
};
export default CheckBox;
