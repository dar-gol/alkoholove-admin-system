import { Link } from "react-router-dom";
import styled from "styled-components";
import { Col } from "../../styles/global.styled";
import { Heading3 } from "../../styles/typography.styled";

export const Block = styled(Link)`
  ${Heading3()}
  padding: 20px 0;
  margin: 0 30px;
  text-align: center;
  border-bottom: 2px solid ${({ theme }) => theme.palette.primary};
`;
export const PanelContainer = styled.article`
  display: flex;

  height: 100%;
`;

export const Content = styled(Col)`
  margin: 0 50px 50px 50px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.palette.White};
`;
