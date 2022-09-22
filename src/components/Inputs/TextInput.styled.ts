import styled from "styled-components";
import { Row } from "../../styles/global.styled";
import { Body, Footer } from "../../styles/typography.styled";

export const InputContainer = styled(Row)`
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
  & .right-icon {
    display: none;
  }
  &.default {
    p {
      ${Body("regular", "large")}
      top: 50%;
      transform: translateY(-50%);
    }
  }
  &.written {
    p {
      top: 0;
      transform: translateY(10%);
      ${Body("regular", "small")}
    }
  }
  &.active {
    border: 2px solid ${({ theme }) => theme.palette.Primary80};
    .left-icon:before {
      color: ${({ theme }) => theme.palette.Primary80};
    }
  }
  &.success {
    border: 2px solid ${({ theme }) => theme.palette.Green80};
    .right-icon:before {
      color: ${({ theme }) => theme.palette.Green80};
    }
    .right-icon {
      display: block;
    }
  }
  &.error {
    border: 2px solid ${({ theme }) => theme.palette.Red80};
    .right-icon:before {
      color: ${({ theme }) => theme.palette.Red80};
    }
    .right-icon,
    .error {
      display: block;
    }
  }
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const Label = styled.p`
  margin: 0;
  position: absolute;
  color: ${({ theme }) => theme.palette.Grey30};
  transition: 0.2s;
`;

export const Input = styled.input`
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

export const Error = styled.span`
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
