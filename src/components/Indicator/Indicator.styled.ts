import styled from "styled-components";
import { Body } from "../../styles/typography.styled";

const setColor = (type: any, theme: { palette: { [k: string]: string } }) => {
  if (type === "primary")
    return {
      textColor: theme.palette.Primary80,
      groundColor: theme.palette.Primary20,
    };
  if (type === "secondary")
    return {
      textColor: theme.palette.Secondary80,
      groundColor: theme.palette.Secondary20,
    };
  if (type === "red")
    return {
      textColor: theme.palette.Red80,
      groundColor: theme.palette.Red20,
    };
  if (type === "green")
    return {
      textColor: theme.palette.Green80,
      groundColor: theme.palette.Green20,
    };
  return {
    textColor: theme.palette.Secondary80,
    groundColor: theme.palette.Secondary20,
  };
};

export const IndicatorContainer = styled.div<{
  size: number;
}>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  position: absolute;
  right: -25px;
  top: 10px;
  justify-content: center;
  display: flex;
  align-items: center;
  border-radius: 100%;
  background: ${({ theme }) => theme.palette.Grey5};
`;

export const Text = styled.span<{ typeColor: string }>`
  color: ${({ typeColor, theme }) => setColor(typeColor, theme).textColor};
  ${Body("medium", "small")}
  &:before {
    color: ${({ typeColor, theme }) => setColor(typeColor, theme).textColor};
    ${Body("medium", "small")}
    font-family: icomoon;
  }
`;

export const IndicatorWrapper = styled.button<{
  size: number;
  typeColor: string;
}>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 100%;
  border: none;
  background-color: ${({ typeColor, theme }) =>
    setColor(typeColor, theme).groundColor};
  cursor: pointer;
`;
