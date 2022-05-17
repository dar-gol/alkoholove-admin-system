/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import Breadcrumb from '../../components/Breadcrumb/breadcrumb';
import Header from '../../components/Header/header';
import InputFactory from '../../components/InputFactory/inputFactory';
import { ADD_INPUTS, API } from '../../utils/constant';
import { post, postMultipart } from '../../utils/fetch';
import { UserContextType } from '../../@types/user';
import { UserContext } from '../../context/userContext';
import FileInput from '../../components/FileInput/fileInput';
import { Form, Container, Title } from './addAlcohol.styled';
import { BtnPrimary } from '../../styles/global.styled';

const isObject = (obj: any) =>
  typeof obj === 'object' && !Array.isArray(obj) && obj !== null;

const AddAlcohol = () => {
  const { user } = useContext(UserContext) as UserContextType;
  const methods = useForm({});

  const submit = (data: any) => {
    console.log(data);
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
    data.image_name = data.name.replaceAll(' ', '_');
    post({
      url: `${API}/alcohols/admin`,
      body: data,
      header: {
        Authorization: `Bearer ${user.access_token}`,
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then((res) => console.log(res))
      .then(() => {
        console.log([
          ['image_name', data.name.replaceAll(' ', '_')],
          ['file', data.file],
        ]);
        return postMultipart({
          url: `${API}/media`,
          body: [
            ['image_name', data.image_name],
            ['file', data.file[0]],
          ],
          header: {
            Authorization: `Bearer ${user.access_token}`,
          },
        });
      })
      .then((res) => {
        alert('Dodałeś alkohol');
        console.log(res);
      })
      .catch((e) => console.log(e));
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
    </>
  );
};

export default AddAlcohol;
