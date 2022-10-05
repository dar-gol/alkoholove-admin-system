import styled from "styled-components";
import { Row, borderRadius } from "../../styles/global.styled";
import { Body, Heading4 } from "../../styles/typography.styled";

export const TextArea = styled.textarea`
  ${Heading4()};
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
  border-radius: ${borderRadius};
  background: ${({ theme }) => theme.palette.input};
  border: 0;
  padding: 20px;
  color: ${({ theme }) => theme.palette.black};
  resize: vertical;
  scrollbar-width: none; /* Firefox 64 */
  &::placeholder {
    color: ${({ theme }) => theme.palette.placeholder};
    opacity: 1;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const test = "";
