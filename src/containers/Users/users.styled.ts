import styled from 'styled-components';
import { Row } from '../../styles/global.styled';

type UserBlock = {
  ban?: boolean;
  admin?: boolean;
};

export const Block = styled(Row)<UserBlock>`
  border-radius: 10px;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
  ${({ ban }) => {
    if (!ban) return '';
    return `border: 2px solid red;`;
  }}
  ${({ admin }) => {
    if (!admin) return '';
    return `border: 2px solid orange;`;
  }}
`;
export const test2 = styled.p``;
