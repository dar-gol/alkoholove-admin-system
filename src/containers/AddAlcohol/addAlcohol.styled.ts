import styled from "styled-components";
import { Col } from "../../styles/global.styled";
import { Body, Heading5Large } from "../../styles/typography.styled";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0 80px;
`;

export const Title = styled.h2`
  ${Heading5Large("bold")}
  text-align: center;
  margin-top: 50px;
  margin-bottom: 0;
  color: ${({ theme }) => theme.palette.Grey80};
`;

export const SectionBar = styled(Col)`
  z-index: 0;
  position: relative;
  margin-bottom: 20px;
  justify-content: center;
  align-items: center;
  ${Body("regular", "large")};
  & p {
    color: ${({ theme }) => theme.palette.Grey40};
    background-color: ${({ theme }) => theme.palette.White};
    margin: 0;
    padding: 0 10px;
    z-index: 1;
  }
  &::after {
    content: "";
    background-color: ${({ theme }) => theme.palette.Grey40};
    height: 1px;
    width: 100%;
    flex: 1;
    position: absolute;
    left: 0;
    top: calc(50% - 1px);
  }
`;

export const Test2 = styled.p``;
