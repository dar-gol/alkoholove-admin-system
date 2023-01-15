import styled from "styled-components";
import {
  activeImage,
  activeInput,
  defaultPlaceholder,
  errorBar,
  errorImage,
  errorInput,
  input,
  inputContainer,
  inputWrapper,
  placeholder,
  successImage,
  successInput,
  writtenPlaceholder,
} from "./CustomInputStyle.styled";
import { Row } from "../../styles/global.styled";
import { Body, Footer } from "../../styles/typography.styled";

export const InputContainer = styled(Row)`
  ${inputContainer}
  &.without-icon {
    gap: 0 !important;
  }
  & .right-icon {
    display: none;
  }
  &.default {
    p {
      ${defaultPlaceholder}
    }
  }
  &.written {
    p {
      ${writtenPlaceholder}
    }
  }
  &.active {
    ${activeInput}
    .left-icon:before {
      ${activeImage}
    }
  }
  &.success {
    ${successInput}
    .right-icon {
      ${successImage}
    }
  }
  &.error {
    ${errorInput}
    .right-icon,
    .error {
      ${errorImage}
    }
  }
`;

export const InputWrapper = styled.div`
  ${inputWrapper}
`;

export const Label = styled.p`
  ${placeholder}
`;

export const Input = styled.input`
  ${input}
`;

export const TextArea = styled.textarea`
  ${input}
  top: 25px;
  &::-webkit-resizer {
    display: none;
  }
`;

export const Error = styled.span`
  ${errorBar}
`;
