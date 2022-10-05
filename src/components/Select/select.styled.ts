import styled from "styled-components";
import Select from "react-select";
import { Body } from "../../styles/typography.styled";

export const CustomSelect = styled(Select).attrs(() => ({
  classNamePrefix: "react-select",
}))`
  min-width: 150px;
  height: 100%;
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

export const Test1 = styled.p``;
