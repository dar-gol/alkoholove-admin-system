import styled from 'styled-components';
import { Col } from '../../styles/global.styled';
import { Heading1 } from '../../styles/typography.styled';

export const Property = styled(Col)`
  border: 1px solid ${({ theme }) => theme.palette.primary};
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  position: relative;
`;
export const BtnDelete = styled.button`
  font-weight: 900;
  font-size: 20px;
  position: absolute;
  bottom: -10px;
  right: -10px;
  height: 30px;
  width: 30px;
  border: 0;
  border-radius: 100%;
  background-color: #d75252;
  color: white;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  cursor: pointer;
`;
