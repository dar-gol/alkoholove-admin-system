import React, { useEffect, useState } from "react";
import {
  BtnPrimary,
  BtnSecondary,
  Col,
  CriticalBar,
  GreenBar,
  InfoBar,
  Key,
  Row,
  Tuple,
  Value,
  WarnBar,
} from "../../styles/global.styled";
import Indicator from "../Indicator/Indicator";
import Modal from "../modal/Modal";
import { ModalTitle } from "../modal/Modal.styled";
import { IndicatorWrapper } from "./TemporaryAlcoholStorage.styled";

interface Props {
  readFromStorage: () => void;
  setToStorage: () => void;
}

const TemporaryAlcoholStorage = ({ readFromStorage, setToStorage }: Props) => {
  const [active, setActive] = useState(false);
  const [activeSuccess, setActiveSuccess] = useState(false);

  const setStorage = () => {
    setToStorage();
    setActiveSuccess(true);
  };

  const readStorage = () => {
    readFromStorage();
    setActive(false);
  };

  const removeStorage = () => {
    localStorage.removeItem("alcohol_form");
  };

  const isStored = () => !localStorage.getItem("alcohol_form");

  const isArray = (value: unknown) => typeof value === "object";

  const getFirstTwoValues = () => {
    const storage = localStorage.getItem("alcohol_form");
    if (storage) {
      const values = JSON.parse(storage);
      const keys = Object.keys(values);
      return (
        <Col>
          <Tuple>
            <Key>{keys[0]}</Key>
            <Value>
              {isArray(values?.[keys[0]])
                ? "Wartość w postaci obiektu"
                : values?.[keys[0]]}
            </Value>
          </Tuple>
          <Tuple visible={!!keys[1]}>
            <Key>{keys[1]}</Key>
            <Value>
              {isArray(values?.[keys[1]])
                ? "Wartość w postaci obiektu"
                : values?.[keys[1]]}
            </Value>
          </Tuple>
        </Col>
      );
    }
    return null;
  };

  return (
    <>
      <IndicatorWrapper>
        <Indicator
          size={50}
          type="primary"
          onClick={() => setActive(true)}
          icon="icon-Tag"
        />
      </IndicatorWrapper>
      <Modal isOpen={active} onClose={() => setActive(false)}>
        <ModalTitle>Tymczasowe przechowywanie wartości</ModalTitle>
        <WarnBar margin="0 0 20px 0">
          <span className="icon-Error" />
          <p>
            W tej wersji systemu panelu administracyjnego niestety nie ma
            możliwości zapisania w przeglądarce zdjęć. Pracujemy nad tym....
            <br />
            Za niedogodności przepraszamy.
          </p>
        </WarnBar>
        <InfoBar margin="0 0 20px 0">
          <span className="icon-Info" />
          <p>
            W przypadku gdy wystąpił błąd i musisz odświeżyć stronę lub nie masz
            wszystkich informacji o alkoholu zalecamy skorzystanie z
            tymczasowego zapisu danych w przeglądarce. Wystarczy nacisnąć
            przycisk poniżej: Zapisz dane.
          </p>
        </InfoBar>
        {getFirstTwoValues()}
        <Row
          gap="20px"
          justifyContent="center"
          flexWrap="wrap"
          margin="0 0 20px 0"
        >
          <BtnPrimary width="240px" onClick={readStorage} disabled={isStored()}>
            Odtwórz dane
          </BtnPrimary>
        </Row>
        <Row gap="20px" justifyContent="center" flexWrap="wrap">
          <BtnSecondary onClick={setStorage} padding="0 20px">
            Zapisz dane
          </BtnSecondary>
          <BtnSecondary onClick={removeStorage} padding="0 20px">
            Usuń dane
          </BtnSecondary>
        </Row>
      </Modal>
      <Modal isOpen={activeSuccess} onClose={() => setActiveSuccess(false)}>
        <ModalTitle>Tymczasowe przechowywanie wartości</ModalTitle>
        <GreenBar margin="0 0 20px 0">
          <span className="icon-Success" />
          <p>Dane zostały zapisane prawidłowo w pamięci przeglądarki.</p>
        </GreenBar>
        <Row gap="20px" justifyContent="center" flexWrap="wrap">
          <BtnPrimary padding="0 20px" onClick={() => setActiveSuccess(false)}>
            Rozumiem
          </BtnPrimary>
        </Row>
      </Modal>
    </>
  );
};

export default TemporaryAlcoholStorage;
