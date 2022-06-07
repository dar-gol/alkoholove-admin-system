/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useEffect, useState } from 'react';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb/breadcrumb';
import Header from '../../components/Header/header';
import FileInput from '../../components/FileInput/fileInput';
import { Form, Title } from './addAlcohol.styled';
import {
  BtnPrimary,
  Col,
  Container,
  Key,
  LinkSecondary,
  ListTitle,
  Row,
  Tuple,
  Value,
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
import { IReq } from '../../@types/fetch';
import Suggestion from '../../components/Suggestion/suggestion';

const getValues = (array: any) => array.map((el: any) => el.value);

const prepareValues = (data: any) => {
  Object.keys(data).forEach((name) => {
    if (data[name] instanceof Array && name !== BARCODE_PROPERTY)
      data[name] = getValues(data[name]);
    if (data[name] === undefined) data[name] = [];
  });
  return data;
};

const prepareToSelect = (data: any) =>
  data.map((el: any) => ({
    label: el,
    value: el,
  }));

const resetValues = (keys: any) =>
  keys.reduce((prev: any, curr: any) => ({ [curr]: '', ...prev }), {
    barcode: [''],
  });

const AddAlcohol = () => {
  const methods = useForm({});
  const { alcoholBarcode } = useParams();
  const [id, setID] = useState<string>('');
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
  const { getCategory, ctg } = useCategory();
  const { send } = useAuthReq('POST', `${API}${URL.POST_ALCOHOLS}`, '');

  const handleCompleteFields = async () => {
    const alcohol = await send({
      method: 'GET',
      url: `${API}${URL.GET_ALCOHOLS}/${alcoholBarcode}`,
      header: { Accept: 'application/json' },
    }).then((data) => data.json());
    console.log({ barcode: alcohol.barcode });
    const category = getCategory(alcohol.kind);
    setCategories({ ...category, kind: alcohol.kind });
    const values = category.properties.reduce((prev, curr) => {
      const { name } = curr;
      const { bsonType } = curr.metadata;
      const prop = alcohol[name];
      const value =
        bsonType === 'array'
          ? { [name]: prepareToSelect(alcohol[name]) }
          : { [name]: prop };
      return { ...prev, ...value };
    }, {});
    setID(alcohol.id);
    methods.reset({
      barcode: alcohol.barcode,
      kind: alcohol.kind,
      ...values,
    });
  };

  useEffect(() => {
    if (!alcoholBarcode) return;
    handleCompleteFields();
  }, [ctg?.categories]);

  const chooseCategory = async ({ kind }: Options) => {
    setCategories({ ...getCategory(kind.value), kind: kind.value });
  };

  const addOrEdit = async (data: any, sm: any, md: any) => {
    const req = {
      body: JSON.stringify({ ...data }),
      header: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
      ...(alcoholBarcode
        ? {
            method: 'PUT',
            url: `${API}${URL.POST_ALCOHOLS}/${id}`,
          }
        : {}),
    };
    const result = await send({ ...req } as IReq);
    if (![200, 201].includes(result.status))
      throw new Error('It is problem with add alcohol!');

    if (alcoholBarcode) return result;

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

    if (resSM.status !== 201 || resMD.status !== 201)
      throw new Error('It is problem with add alcohol!');

    return result;
  };

  const submit = async (data: any) => {
    console.log({ data });
    setIsLoading(true);
    const { sm, md } = data;
    delete data.sm;
    delete data.md;
    const values = prepareValues(data);
    try {
      await addOrEdit({ ...values, kind: categories.kind }, sm, md);
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
        <Title>Formularz dodawania/edycji alkoholu</Title>
        <CategoryForm submit={chooseCategory} kindName={categories.kind} />
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
              {!alcoholBarcode && (
                <FileInput
                  name="sm"
                  title="Małe zdjęcie 300 X 400 (Należy dodać zdjęcie skompresowane):"
                  required
                />
              )}
              {!alcoholBarcode && (
                <FileInput
                  name="md"
                  title="Duże zdjęcie 600 X 800 (Należy dodać zdjęcie skompresowane):"
                  required
                />
              )}
              <Row justifyContent="flex-end">
                <BtnPrimary type="submit" margin="20px 0">
                  Dodaj/edytuj alkohol
                </BtnPrimary>
              </Row>
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
              <LinkSecondary to="/alcohol">
                Wracam do listy alkoholi
              </LinkSecondary>
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
      <Suggestion />
    </>
  );
};

export default AddAlcohol;
