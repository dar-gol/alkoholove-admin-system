import styled from "styled-components";
import Creatable from "react-select/creatable";
import {
  selectControl,
  selectControlFocused,
  selectIndicatorsContainer,
  selectOption,
  selectOptionHover,
  selectOptionSelected,
  selectPlaceholderPlace,
  selectSeparator,
  selectStyle,
  selectValue,
  selectValueContainer,
} from "./CustomReactSelectStyle";
import {
  defaultPlaceholder,
  input,
  writtenPlaceholder,
} from "./CustomInputStyle.styled";

export const StyledMultiInput = styled(Creatable).attrs(() => ({
  classNamePrefix: "react-select",
}))`
  ${selectStyle}
  & .react-select__control {
    ${selectControl}
  }
  &.written .react-select__control::before {
    ${writtenPlaceholder}
  }
  &.default .react-select__control::before {
    ${defaultPlaceholder}
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

  .react-select__placeholder {
    ${selectPlaceholderPlace}
  }

  & .react-select__value-container {
    ${input}
    top: 15%;
    padding-left: 16px !important;
    ${selectValueContainer}
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

  & .react-select__menu {
    display: none;
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

  & .react-select__dropdown-indicator {
    display: none;
  }

  & .react-select__indicators {
    ${selectIndicatorsContainer}
  }
`;
