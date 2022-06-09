import React, { useEffect, useState } from 'react';

import { Row, Col, BtnPrimary, InputText } from '../../styles/global.styled';
import { Container, Title } from './Login.styled';

import Spacings from '../../styles/spacings';
import useLogin from '../../utils/hooks/useLogin';
import ErrorModal from '../../components/ErrorModal/errorModal';

const Login = () => {
  const { loginHandler, error, setError } = useLogin();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    console.log({ error });
  }, [error]);
  return (
    <Container>
      <Col gap={`${Spacings.s3}px`}>
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
          />
        </Row>
        <Row>
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
    </Container>
  );
};

export default Login;
