import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import ReactSelect from 'react-select';
import Breadcrumb from '../../components/Breadcrumb/breadcrumb';
import Header from '../../components/Header/header';
import PropertyInput from '../../components/PropertyInput/propertyInput';
import TextInput from '../../components/SimpleInput/TextInput';
import { BtnPrimary, Col, Row } from '../../styles/global.styled';
import { API, URL } from '../../utils/constant';
import useAuthReq from '../../utils/hooks/useReq';
import { Container, Title } from './addCategory.styled';

type PropertyState = string | null;

const generateProp = (data: any, name: any) => {
  const type = data[`${name}BsonType`].value;
  const required = data[`${name}Required`];
  const description = data[`${name}Description`];
  const title = data[`${name}Title`];
  const bsonType = required ? type : [type, null];
  const items = type === 'array' ? { items: { bsonType: 'string' } } : {};
  return { required, description, title, bsonType, items };
};

const AddCategory = () => {
  const methods = useForm();
  const [names, setNames] = useState<PropertyState[]>([]);
  const { send } = useAuthReq('POST', `${API}${URL.CATEGORIES}`, '', {
    'Content-Type': 'application/json',
  });

  const addName = (name: string, index: number) => {
    if (names.includes(name)) return false;
    setNames((prev) => {
      const state = [...prev];
      state[index] = name;
      return state;
    });
    return true;
  };

  const addProperty = () => {
    console.log(!names[names.length - 1], names.length > 0, names);
    if (names[names.length - 1] === '' && names.length > 0) return false;
    setNames((prev: PropertyState[]) => [...prev, '']);
    return true;
  };

  const deleteProperty = (index: number) => {
    setNames((prev) => {
      const state = [...prev];
      state[index] = null;
      return state;
    });
  };

  const submit = (data: any) => {
    const traits = names.filter((name) => name);
    console.log(traits);
    const body = traits.reduce<{
      properties: object;
      required: string[];
    }>(
      (prev, curr: any) => {
        const prop = generateProp(data, curr);
        const { description, title, bsonType, required } = prop;
        return {
          properties: {
            ...prev.properties,
            [curr]: {
              description,
              title,
              bsonType,
              ...prop.items,
            },
          },
          required: [...prev.required, ...(required ? [curr] : [])],
        };
      },
      {
        properties: {
          kind: {
            enum: [data.kind],
          },
        },
        required: [],
      }
    );
    console.log(body);
    send({
      body: JSON.stringify({
        ...body,
        title: data.kind,
      }),
    });
  };

  return (
    <>
      <Header />
      <Breadcrumb />
      <Container>
        <Title>Formularz dodawania kategorii</Title>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(submit)}>
            <TextInput name="kind" title="Nazwa rodzaju kategorii" required />
            <p>Dodaj cechy:</p>
            <Col gap="20px">
              {names.map((name, index) => {
                const key = `propertyInput${index}`;
                return (
                  name !== null && (
                    <PropertyInput
                      key={key}
                      id={index}
                      addName={addName}
                      deleteProperty={deleteProperty}
                    />
                  )
                );
              })}
            </Col>
            <Row justifyContent="flex-end" margin="40px 0 0 0">
              <BtnPrimary type="button" onClick={addProperty}>
                + Dodaj kolejną cechę
              </BtnPrimary>
            </Row>
            <Row justifyContent="flex-end" margin="40px 0 0 0">
              <BtnPrimary type="submit">Dodaj kategorię</BtnPrimary>
            </Row>
          </form>
        </FormProvider>
      </Container>
    </>
  );
};

export default AddCategory;
