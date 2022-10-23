import styled from "styled-components";
import { Row } from "../../styles/global.styled";
import {
  Body,
  Heading3Large,
  Heading4Large,
} from "../../styles/typography.styled";

export const Container = styled.section`
  width: 100vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const DayNightContainer = styled(Row)`
  position: absolute;
  top: 20px;
  right: 20px;
`;

export const ContrastModeContrainer = styled(Row)`
  position: absolute;
  top: 20px;
  right: 120px;
`;

export const Title = styled.h1`
  ${Heading3Large("bold")}
  color: ${({ theme }) => theme.palette.Primary80};
  text-align: center;
  margin: 0;
  white-space: nowrap;
`;

export const SubTitle = styled.h2`
  ${Heading4Large("bold")}
  color: ${({ theme }) => theme.palette.Grey90};
  text-align: center;
  margin: 0;
`;

export const Logo = styled.img`
  width: 80px;
  height: 80px;
`;

export const LogoWrapper = styled(Row)`
  width: 150px;
  min-height: 150px;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.palette.White};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.palette.White};
  border: 2px solid
    ${({ theme }) =>
      theme.isHighContrast ? theme.palette.Grey80 : "transparent"};
  padding: 80px 80px;
  gap: 20px;
  border-radius: 20px;
  align-items: center;
`;

export const ForgottenPassword = styled.a`
  ${Body("regular", "medium")}
  color: ${({ theme }) => theme.palette.Grey40};
`;

export const BtnUIWrapper = styled.div`
  position: absolute;
  bottom: 30px;
  right: 30px;
`;
