import React from 'react';
import styled from 'styled-components';
import { BlockType, Col, Row } from '../../styles/global.styled';
import { Common, Heading3, Heading4 } from '../../styles/typography.styled';

export const Container = styled<any>(Col)`
  position: fixed;
  top: 30px;
  background: white;
  right: ${({ hide }) => (hide ? '-540px' : '0px')};
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  width: 500px;
  transition: 0.4s;
`;

export const Hide = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 50px;
  left: -40px;
  border-radius: 0;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  border: 0;
  background: white;
  box-shadow: -5px 0px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  color: ${({ theme }) => theme.palette.primary};
`;

export const GoToList = styled.button`
  color: ${({ theme }) => theme.palette.primary};
  border: 0;
  background-color: transparent;
  cursor: pointer;
`;

export const List = styled(Col)`
  height: 250px;
  overflow-y: scroll;
`;

export const Block = styled(Row)`
  ${Common()}
  border-radius: 10px;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

export const SuggNumber = styled.span`
  position: absolute;
  top: -3px;
  left: -5px;
  background: red;
  color: white;
  font-size: 10px;
  font-weight: 600;
  padding: 5px;
  border-radius: 20px;
  min-width: 12px;
`;
