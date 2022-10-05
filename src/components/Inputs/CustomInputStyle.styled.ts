import styled, { css } from "styled-components";
import { Body, Footer } from "../../styles/typography.styled";

export const inputContainer = css`
  box-sizing: border-box;
  position: relative;
  background-color: ${({ theme }) => theme.palette.Grey5};
  border: 2px solid ${({ theme }) => theme.palette.Grey5};
  align-items: center;
  padding: 0 15px;
  border-radius: 20px;
  height: 52px;
  flex: 1;
  width: 100%;
  gap: 10px;
  ${Body("regular", "large")};
`;

export const input = css`
  background-color: transparent;
  border: none;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 10%;
  padding: 0 !important;
  color: ${({ theme }) => theme.palette.Grey80};
  ${Body("regular", "large")}
  &:focus,
  &:focus-visible {
    border: none;
    outline: none;
  }
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
  }
  &:-webkit-autofill {
    -webkit-text-fill-color: ${({ theme }) => theme.palette.Grey80} !important;
  }
`;

export const inputWrapper = css`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const placeholder = css`
  margin: 0;
  position: absolute;
  color: ${({ theme }) => theme.palette.Grey30};
  transition: 0.2s;
  text-transform: capitalize;
`;

export const defaultPlaceholder = css`
  ${Body("regular", "large")}
  top: 50%;
  transform: translateY(-50%);
`;

export const writtenPlaceholder = css`
  top: 0;
  transform: translateY(10%);
  ${Body("regular", "small")}
`;

export const activeInput = css`
  border: 2px solid ${({ theme }) => theme.palette.Primary80};
`;

export const activeImage = css`
  color: ${({ theme }) => theme.palette.Primary80};
`;

export const successInput = css`
  border: 2px solid ${({ theme }) => theme.palette.Green80};
`;

export const successImage = css`
  display: block;
  &:before {
    color: ${({ theme }) => theme.palette.Green80};
  }
`;

export const errorInput = css`
  border: 2px solid ${({ theme }) => theme.palette.Red80};
`;

export const errorImage = css`
  display: block;
  &:before {
    color: ${({ theme }) => theme.palette.Red80};
  }
`;

export const errorBar = css`
  display: none;
  bottom: -6px;
  left: 50%;
  height: 12px;
  line-height: 12px !important;
  text-align: center;
  border-radius: 5px;
  transform: translateX(-50%);
  width: 80%;
  position: absolute;
  background-color: ${({ theme }) => theme.palette.Red80};
  color: ${({ theme }) => theme.palette.White};
  ${Footer("regular")}
`;
