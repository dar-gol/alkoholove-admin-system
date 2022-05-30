/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useState } from 'react';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import Breadcrumb from '../../components/Breadcrumb/breadcrumb';
import Header from '../../components/Header/header';
import FileInput from '../../components/FileInput/fileInput';
import { Form, Title } from './addAlcohol.styled';
import {
  BtnPrimary,
  Container,
  LinkSecondary,
  Row,
} from '../../styles/global.styled';
import Loader from '../../components/Loader/loader';
import Modal from '../../components/modal/Modal';
import { ModalTitle } from '../../components/modal/Modal.styled';
import useCategory from '../../utils/hooks/useCategory';
import CategoryForm from '../../components/CategoryForm/categoryForm';
import { inputType, Options } from '../../@types/inputs';
import { SpecificCategory, Type } from '../../@types/category';
import InputFactory from '../../components/InputFactory/inputFactory';
import { API, BARCODE_PROPERTY, INPUT_TYPE, URL } from '../../utils/constant';
import MoreInput from '../../components/MoreInput/moreInput';
import useAuthReq from '../../utils/hooks/useReq';
import { getType, createImageName, createFormData } from '../../utils/utils';

const getValues = (array: any) => array.map((el: any) => el.value);

const prepareValues = (data: any) => {
  Object.keys(data).forEach((name) => {
    if (data[name] instanceof Array && name !== BARCODE_PROPERTY) {
      data[name] = getValues(data[name]);
    }
  });
  return data;
};

const resetValues = (keys: any) =>
  keys.reduce((prev: any, curr: any) => ({ [curr]: '', ...prev }), {
    barcode: [''],
  });

const AddAlcohol = () => {
  const methods = useForm({});
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<
    SpecificCategory & { kind: string | null }
  >({
    kind: null,
    required: [],
    properties: [],
  });
  const { getNames, getCategory } = useCategory();
  const { send } = useAuthReq('POST', `${API}${URL.POST_ALCOHOLS}`, '');

  const chooseCategory = async ({ kind }: Options) => {
    console.log(getCategory(kind.value));
    setCategories({ ...getCategory(kind.value), kind: kind.value });
  };

  const submit = async (data: any) => {
    setIsLoading(true);
    const { sm, md } = data;
    delete data.sm;
    delete data.md;
    try {
      const res = await send({
        body: JSON.stringify({ ...prepareValues(data), kind: categories.kind }),
        header: {
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
      });
      const formDataSM = createFormData([
        ['image_name', createImageName(data.name, 'sm')],
        ['file', sm[0]],
      ]);
      const resSM = await send({
        url: `${API}${URL.UPLOAD_IMAGE}`,
        body: formDataSM,
      });
      const formDataMD = createFormData([
        ['image_name', createImageName(data.name, 'md')],
        ['file', md[0]],
      ]);
      const resMD = await send({
        url: `${API}${URL.UPLOAD_IMAGE}`,
        body: formDataMD,
        header: { Accept: '*/*' },
      });
      console.log(res.status, resSM.status, resMD.status);
      if (res.status !== 201 || resSM.status !== 201 || resMD.status !== 201)
        throw new Error('It is problem with add alcohol!');
      setIsValid(true);
      methods.reset(resetValues(Object.keys(data)));
    } catch (e: any) {
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
        <CategoryForm submit={chooseCategory} />
        {!!categories.properties.length && (
          <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(submit)}>
              <MoreInput name="barcode" title="Kod kreskowy" required />
              {categories.properties.map((input) => {
                const { bsonType, title } = input.metadata;
                const { name } = input;
                const { type, required } = getType(bsonType);

                return (
                  <InputFactory
                    key={name}
                    type={type}
                    name={name}
                    title={title}
                    required={required}
                  />
                );
              })}
              <FileInput name="sm" title="Małe zdjęcie (sm):" required />
              <FileInput name="md" title="Duże zdjęcie (md):" required />
              <BtnPrimary type="submit" margin="20px 0">
                Dodaj alkohol
              </BtnPrimary>
            </Form>
          </FormProvider>
        )}
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
