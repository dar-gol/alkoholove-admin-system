import React, { useState } from 'react';

import { Row, Col, BtnPrimary, InputText } from '../../styles/global.styled';
import { Container, Title } from './Login.styled';

import Spacings from '../../styles/spacings';
import useLogin from '../../utils/hooks/useLogin';

const Login = () => {
  const { loginHandler } = useLogin();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
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
    </Container>
  );
};

export default Login;
