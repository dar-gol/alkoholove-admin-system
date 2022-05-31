import styled from 'styled-components';
import { Row } from '../../styles/global.styled';
import { Heading4 } from '../../styles/typography.styled';

export const Block = styled(Row)`
  border-radius: 10px;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
`;
export const Warn = styled.p`
  ${Heading4()}
  color: ${({ theme }) => theme.palette.primary};
  text-decoration: none;
`;

export const Black = styled.span`
  color: ${({ theme }) => theme.palette.black};
`;
