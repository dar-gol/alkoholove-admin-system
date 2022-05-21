/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useState } from 'react';
import { useForm, FormProvider, useFieldArray } from 'react-hook-form';
import Breadcrumb from '../../components/Breadcrumb/breadcrumb';
import Header from '../../components/Header/header';
import InputFactory from '../../components/InputFactory/inputFactory';
import { ADD_INPUTS, API } from '../../utils/constant';
import { postJSON, postMultipart } from '../../utils/fetch';
import { UserContextType } from '../../@types/user';
import { UserContext } from '../../context/userContext';
import FileInput from '../../components/FileInput/fileInput';
import { Form, Container, Title } from './addAlcohol.styled';
import { BtnPrimary, LinkSecondary, Row } from '../../styles/global.styled';
import Loader from '../../components/Loader/loader';
import Modal from '../../components/modal/Modal';
import { ModalTitle } from '../../components/modal/Modal.styled';

const isObject = (obj: any) =>
  typeof obj === 'object' && !Array.isArray(obj) && obj !== null;

const AddAlcohol = () => {
  const { user } = useContext(UserContext) as UserContextType;
  const methods = useForm({});
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const submit = async (data: any) => {
    setIsLoading(true);
    Object.entries(data).forEach(([key, value]: [key: any, value: any]) => {
      if (value instanceof FileList) {
        console.log('FileList');
      } else if (isObject(value)) {
        data[key] = value.value;
      } else if (isObject(value?.[0])) {
        data[key] = value.map((val: any) => val.value);
      } else if (parseFloat(value) && !Array.isArray(value)) {
        data[key] = parseFloat(value);
      } else if (!value) {
        data[key] = 0;
      }
    });
    data.image_name = data.name?.replaceAll?.(' ', '_');
    try {
      const res = await postJSON({
        url: `${API}/alcohols/admin`,
        body: data,
        header: {
          Authorization: `Bearer ${user.access_token}`,
          'Access-Control-Allow-Origin': '*',
        },
      });
      const resImage = await postMultipart({
        url: `${API}/media`,
        body: [
          ['image_name', data.image_name],
          ['file', data.file[0]],
        ],
        header: {
          Authorization: `Bearer ${user.access_token}`,
        },
      });
      if (res.status !== 201 || resImage.status !== 201)
        throw Error("You didn't add alcohol");
      methods.reset();
      setIsValid(true);
    } catch (e) {
      setIsValid(false);
    } finally {
      setIsLoading(false);
      setIsOpen(true);
    }
  };

  return (
    <>
      <Header />
      <Breadcrumb />
      <Container>
        <Title>Formularz dodawania alkoholu</Title>
        <FormProvider {...methods}>
          <Form onSubmit={methods.handleSubmit(submit)}>
            {ADD_INPUTS.map((input) => (
              <InputFactory {...input} key={input.name} />
            ))}
            <FileInput />
            <BtnPrimary type="submit" margin="20px 0">
              {' '}
              Dodaj alkohol
            </BtnPrimary>
          </Form>
        </FormProvider>
      </Container>
      <Modal isOpen={isLoading} onClose={() => {}} isClosable={false}>
        <ModalTitle>Dodajemy nowy alkohol</ModalTitle>
        <Row justifyContent="center">
          <Loader />
        </Row>
      </Modal>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {isValid ? (
          <>
            <ModalTitle>Alkohol został dodany prawidłowo</ModalTitle>
            <Row gap="20px">
              <BtnPrimary onClick={() => setIsOpen(false)}>
                Dodaje kolejny alkohol
              </BtnPrimary>
              <LinkSecondary to="/home">Wracam do listy alkoholi</LinkSecondary>
            </Row>
          </>
        ) : (
          <>
            <ModalTitle>Wystąpił problem z dodaniem alkoholu!</ModalTitle>
            <Row justifyContent="center">
              <BtnPrimary onClick={() => setIsOpen(false)}>OK</BtnPrimary>
            </Row>
          </>
        )}
      </Modal>
    </>
  );
};

export default AddAlcohol;
