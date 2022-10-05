import Select from "react-select";
import styled, { keyframes } from "styled-components";
import { Primary } from "../../stories/BoolInput.stories";
import { Col, Row } from "../../styles/global.styled";
import { Body, Heading3 } from "../../styles/typography.styled";

export const SmallImage = styled.img`
  width: 80px;
  object-fit: cover;
  vertical-align: middle;
  height: 80px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.palette.BackgroundTransparency10};
`;
