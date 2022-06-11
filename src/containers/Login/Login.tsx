import React, { useEffect, useState } from 'react';

import { Row, Col, BtnPrimary, InputText } from '../../styles/global.styled';
import { Container, Title } from './Login.styled';

import Spacings from '../../styles/spacings';
import useLogin from '../../utils/hooks/useLogin';
import ErrorModal from '../../components/ErrorModal/errorModal';
import Modal from '../../components/modal/Modal';
import { ModalTitle } from '../../components/modal/Modal.styled';
import Loader from '../../components/Loader/loader';

const Login = () => {
  const { loginHandler, error, setError, isLoading } = useLogin();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <Container>
      <Col gap={`${Spacings.s3}px`}>
        <Row justifyContent="center">
          <img
            src="./logo192.png"
            alt="This is a alkohoLove's logo"
            width="150px"
          />
        </Row>
        <Row>
          <Title>Panel administracyjny</Title>
        </Row>
        <Row>
          <InputText
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Row>
        <Row>
          <InputText
            placeholder="Hasło"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') loginHandler(email, password);
            }}
          />
        </Row>
        <Row justifyContent="center">
          <BtnPrimary onClick={() => loginHandler(email, password)}>
            Zaloguj się
          </BtnPrimary>
        </Row>
      </Col>
      <ErrorModal
        isOpen={!!error}
        title="Problem z logowaniem"
        text="Upewnij się, że wpisałeś poprawne dane logowania"
        details={error}
        onClose={() => setError('')}
      />
      <Modal isOpen={isLoading} onClose={() => {}} isClosable={false}>
        <ModalTitle>Proszę czekać trwa logowanie</ModalTitle>
        <Row justifyContent="center">
          <Loader />
        </Row>
      </Modal>
    </Container>
  );
};

export default Login;
