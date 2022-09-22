import Select from "react-select";
import styled from "styled-components";
import { Primary } from "../../stories/BoolInput.stories";
import { Body, Heading3 } from "../../styles/typography.styled";

const tableSetting = {
  radius: "20px",
  rowSpacing: "10px",
};

export const Table = styled.table`
  margin: -${tableSetting.rowSpacing} 0;
  background-color: ${({ theme }) => theme.palette.White};
  padding: 5px 20px;
  padding-bottom: 20px;
  border-collapse: separate;
  border-spacing: 0 ${tableSetting.rowSpacing};
  border-radius: 20px;
`;

export const TCell = styled.td<{ width?: string }>`
  background-color: ${({ theme }) => theme.palette.Grey5};
  padding: ${({ theme }) => theme.spacings.s2}px;
  vertical-align: middle;
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
`;

export const TRow = styled.tr`
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
  /* white-space: nowrap; */
`;

export const Value = styled.p`
  ${Body("bold", "large")}
  color: ${({ theme }) => theme.palette.Grey90};
  margin: 0;
  /* white-space: nowrap; */
`;

export const SmallImage = styled.img`
  width: 80px;
  object-fit: cover;
  vertical-align: middle;
  height: 80px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.palette.BackgroundTransparency10};
`;

export const CustomSelect = styled(Select).attrs(() => ({
  classNamePrefix: "react-select",
}))`
  min-width: 150px;
  & .react-select__control {
    height: 100%;
    border-radius: 20px !important;
    border: none !important;
    background: ${({ theme }) => theme.palette.Grey5};
  }
  & .react-select__control.react-select__control--is-focused {
    box-shadow: 0 0 0 1px ${({ theme }) => theme.palette.Primary70} !important;
  }
  & .react-select__indicator-separator {
    display: none;
  }
  & .react-select__single-value {
    ${Body("regular", "large")}
    color: ${({ theme }) => theme.palette.Grey80};
  }
  & .react-select__value-container {
    padding-left: 16px;
  }

  & .react-select__menu {
    border-radius: 20px;
    margin-top: 5px;
    overflow: hidden;
    background-color: ${({ theme }) => theme.palette.Grey5};
  }

  & .react-select__option {
    color: ${({ theme }) => theme.palette.Grey70};
  }

  & .react-select__option:hover {
    background-color: ${({ theme }) => theme.palette.Grey10};
  }

  & .react-select__option.react-select__option--is-selected {
    background-color: ${({ theme }) => theme.palette.Secondary30};
    color: ${({ theme }) => theme.palette.Secondary80};
  }
`;
