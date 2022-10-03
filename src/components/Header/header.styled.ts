import styled from "styled-components";
import { Body, Heading4Large } from "../../styles/typography.styled";

export const Container = styled.header`
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  padding: ${({ theme }) => `0 ${theme.spacings.s6}px`};
  background-color: transparent;
  @media (max-width: 768px) {
    & {
      zoom: 0.8;
    }
  }
`;

export const Title = styled.h2`
  ${Heading4Large("bold")}
  color: ${({ theme }) => theme.palette.Grey100};
  margin: 0;
  white-space: nowrap;
`;

export const SubTitle = styled.h3`
  ${Body("regular", "large")};
  color: ${({ theme }) => theme.palette.Grey40};
  margin: 0;
  white-space: nowrap;
`;

export const Icon = styled.span`
  cursor: pointer;
  &:before {
    ${Heading4Large("bold")}
    font-family: icomoon;
    color: ${({ theme }) => theme.palette.Grey80};
  }
`;

export const Profil = styled.div`
  position: relative;
`;

export const PopupContainer = styled.div<{ show: boolean }>`
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 100;
  background: ${({ theme }) => theme.palette.White};
  padding: 10px 20px;
  right: -10px;
  bottom: -10px;
  transform: translateY(100%) scale(${({ show }) => (show ? 1 : 0)});
  transition: 0.2s;
  transform-origin: top right;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.03);
`;

export const ArrowUp = styled.div`
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid ${({ theme }) => theme.palette.White};
  position: absolute;
  top: -10px;
  right: 12px;
`;

export const TextLine = styled.p`
  margin: 5px 0;
  white-space: nowrap;
  ${Body("regular", "small")}
  color: ${({ theme }) => theme.palette.Grey40};
`;

export const ProfilName = styled(TextLine)`
  color: ${({ theme }) => theme.palette.Grey80};
  ${Body("bold", "large")}
`;

export const TextGreen = styled(TextLine)`
  color: ${({ theme }) => theme.palette.Green90};
  ${Body("bold", "small")}
`;

export const TextRed = styled(TextLine)`
  color: ${({ theme }) => theme.palette.Red90};
  ${Body("bold", "small")}
`;

export const Line = styled.div`
  width: 100%;
  height: 2px;
  background-color: ${({ theme }) => theme.palette.Grey10};
  margin: 10px 0px;
`;

export const BtnLink = styled.button`
  color: ${({ theme }) => theme.palette.Secondary70};
  margin: 5px 0;
  white-space: nowrap;
  ${Body("regular", "small")}
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
`;
