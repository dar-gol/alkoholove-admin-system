import styled, { AnyStyledComponent } from "styled-components";
import Select from "react-select";
import Creatable from "react-select/creatable";
import {
  writtenPlaceholder,
  defaultPlaceholder,
  input,
} from "./CustomInputStyle.styled";
import {
  selectControl,
  selectControlFocused,
  selectIndicatorsContainer,
  selectMenu,
  selectOption,
  selectOptionHover,
  selectOptionSelected,
  selectPlaceholderPlace,
  selectSeparator,
  selectStyle,
  selectValue,
  selectValueContainer,
} from "./CustomReactSelectStyle";

export const CustomSelect = styled(Select).attrs(() => ({
  classNamePrefix: "react-select",
}))`
  ${selectStyle}
  &.written .react-select__control::before {
    ${writtenPlaceholder}
  }
  &.default .react-select__control::before {
    ${defaultPlaceholder}
  }
  & .react-select__control {
    ${selectControl}
  }
  & .react-select__control.react-select__control--is-focused {
    ${selectControlFocused}
  }
  & .react-select__indicator-separator {
    ${selectSeparator}
  }
  & .react-select__single-value {
    ${selectValue}
  }
  & .react-select__value-container {
    ${input}
    padding-left: 16px !important;
    ${selectValueContainer}
  }

  & .react-select__menu {
    ${selectMenu}
  }

  & .react-select__option {
    ${selectOption}
  }

  & .react-select__option:hover {
    ${selectOptionHover}
  }

  & .react-select__option.react-select__option--is-selected {
    ${selectOptionSelected}
  }
  & .react-select__placeholder {
    ${selectPlaceholderPlace}
  }
  & .react-select__indicators {
    ${selectIndicatorsContainer}
  }
`;

export const CustomCreatable = styled(Creatable).attrs(() => ({
  classNamePrefix: "react-select",
}))`
  ${selectStyle}
  &.written .react-select__control::before {
    ${writtenPlaceholder}
  }
  &.default .react-select__control::before {
    ${defaultPlaceholder}
  }
  & .react-select__control {
    ${selectControl}
  }
  & .react-select__control.react-select__control--is-focused {
    ${selectControlFocused}
  }
  & .react-select__indicator-separator {
    ${selectSeparator}
  }
  & .react-select__single-value {
    ${selectValue}
  }
  & .react-select__value-container {
    ${input}
    top: 15%;
    padding-left: 16px !important;
    ${selectValueContainer}
  }

  & .react-select__menu {
    ${selectMenu}
  }

  & .react-select__multi-value {
    border-radius: 10px;
    background-color: ${({ theme }) => theme.palette.Grey10};
    & .react-select__multi-value__label {
      color: ${({ theme }) => theme.palette.Grey80};
    }
    & .react-select__multi-value__remove {
      color: ${({ theme }) => theme.palette.Grey50};
    }
  }

  & .react-select__option {
    ${selectOption}
  }

  & .react-select__option:hover {
    ${selectOptionHover}
  }

  & .react-select__option.react-select__option--is-selected {
    ${selectOptionSelected}
  }
  & .react-select__placeholder {
    ${selectPlaceholderPlace}
  }
  & .react-select__indicators {
    ${selectIndicatorsContainer}
  }
`;
