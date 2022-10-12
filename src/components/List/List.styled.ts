import styled from "styled-components";
import { Body } from "../../styles/typography.styled";

interface ITCell {
  width?: string;
  padding?: string;
  verticalAlign?: string;
}

const tableSetting = {
  radius: "20px",
  rowSpacing: "10px",
};

export const TCell = styled.td<ITCell>`
  background-color: ${({ theme }) => theme.palette.Grey5};
  padding: ${({ theme, padding }) => padding || `${theme.spacings.s2}px`};
  vertical-align: ${({ verticalAlign }) => verticalAlign || "middle"};
  width: ${({ width }) => width || "unset"};
  transition: 0.1s;

  &:first-child {
    border-top-left-radius: ${tableSetting.radius};
    border-bottom-left-radius: ${tableSetting.radius};
  }
  &:last-child {
    border-bottom-right-radius: ${tableSetting.radius};
    border-top-right-radius: ${tableSetting.radius};
  }
  @media (max-width: 768px) {
    &:nth-child(3),
    &:nth-child(4) {
      display: none;
    }
  }
`;

export const TRow = styled.tr<{ pointerEvents?: string }>`
  pointer-events: ${({ pointerEvents }) => pointerEvents || "auto"};
  transition: 0.1s;
  cursor: pointer;
  &:hover ${TCell} {
    filter: brightness(0.97);
    transform: scale(1.02);
  }
  &:focus-visible {
    outline: ${({ theme }) => theme.palette.Primary90} auto 2px;
  }
`;

export const Title = styled.h6`
  ${Body("regular", "medium")}
  color: ${({ theme }) => theme.palette.Grey40};
  margin: 0;
  margin-bottom: 5px;
  white-space: nowrap;
`;

export const Value = styled.p<{ maxWidth?: string }>`
  ${Body("bold", "large")}
  color: ${({ theme }) => theme.palette.Grey90};
  margin: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: ${({ maxWidth }) => maxWidth || "200px"};
  overflow: hidden;
`;

export const Table = styled.table`
  margin: -${tableSetting.rowSpacing} 0;
  background-color: ${({ theme }) => theme.palette.White};
  padding: 5px 20px;
  padding-bottom: 20px;
  border-collapse: separate;
  border-spacing: 0 ${tableSetting.rowSpacing};
  border-radius: 20px;
`;
export const tt = 1;
