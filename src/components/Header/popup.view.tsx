import React from "react";
import {
  PopupContainer,
  ProfilName,
  TextGreen,
  TextLine,
  ArrowUp,
  Line,
  BtnLink,
} from "./header.styled";

interface Props {
  show: boolean;
  logout: () => void;
}

const Popup = ({ logout, show }: Props) => (
  <PopupContainer show={show}>
    <ArrowUp />
    <ProfilName>PLacek</ProfilName>
    <TextLine>Wprowadzonych alkoholi: 46</TextLine>
    <TextGreen>Dobra robota!</TextGreen>
    <Line />
    <BtnLink>Przejdź do profilu</BtnLink>
    <BtnLink onClick={logout}>Wyloguj się</BtnLink>
  </PopupContainer>
);

export default Popup;
