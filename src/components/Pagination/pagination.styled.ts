import styled from 'styled-components';
import { BtnPrimary } from '../../styles/global.styled';

export const CurrentPage = styled(BtnPrimary)`
  border: 2px solid ${({ theme }) => theme.palette.iconSecondary};
  background-color: ${({ theme }) => theme.palette.white};
  color: ${({ theme }) => theme.palette.black};
`;
export const Test2 = styled.p``;
