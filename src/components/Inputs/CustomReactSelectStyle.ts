import styled, { css } from "styled-components";

import { Body } from "../../styles/typography.styled";

export const selectStyle = css`
  min-width: 150px;
  height: 100%;
`;

export const selectControl = css`
  height: 100%;
  border-radius: 20px !important;
  border: none !important;
  background: ${({ theme }) => theme.palette.Grey5};
  &::before {
    content: "${({ placeholder }: any) => placeholder}";
    margin: 0;
    position: absolute;
    color: ${({ theme }) => theme.palette.Grey30};
    transition: 0.2s;
    text-transform: capitalize;
    padding-left: 16px;
  }
`;

export const selectControlFocused = css`
  box-shadow: 0 0 0 2px ${({ theme }) => theme.palette.Primary70} !important;
`;

export const selectSeparator = css`
  display: none;
`;

export const selectValue = css`
  ${Body("regular", "large")}
  color: ${({ theme }) => theme.palette.Grey80};
`;

export const selectValueContainer = css`
  padding-left: 16px;
`;

export const selectMenu = css`
  border-radius: 20px;
  margin-top: 5px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.palette.Grey5};
`;

export const selectOption = css`
  color: ${({ theme }) => theme.palette.Grey70};
  background-color: unset;
`;

export const selectOptionHover = css`
  background-color: ${({ theme }) => theme.palette.Grey10};
`;

export const selectOptionSelected = css`
  background-color: ${({ theme }) => theme.palette.Secondary30};
  color: ${({ theme }) => theme.palette.Secondary80};
`;

export const selectPlaceholderPlace = css`
  display: none;
`;

export const selectIndicatorsContainer = css`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
`;
