import styled from 'styled-components';
import { Heading3 } from '../../styles/typography.styled';

export const Test1 = styled.p``;
export const Test2 = styled.p``;

export const ModalContainer = styled.form`
  padding: 30px;
  background-color: white;
  min-width: 250px;
  border-radius: 20px;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.4);
`;

export const ModalTitle = styled.p`
  ${Heading3()}
  text-align: center;
`;
