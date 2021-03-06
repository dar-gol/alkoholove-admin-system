import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import ReactSelect from 'react-select';
import { Types } from '../../@types/category';
import Breadcrumb from '../../components/Breadcrumb/breadcrumb';
import ErrorModal from '../../components/ErrorModal/errorModal';
import Header from '../../components/Header/header';
import Modal from '../../components/modal/Modal';
import { ModalTitle } from '../../components/modal/Modal.styled';
import PropertyInput from '../../components/PropertyInput/propertyInput';
import TextInput from '../../components/SimpleInput/TextInput';
import {
  BtnPrimary,
  Col,
  Container,
  LinkSecondary,
  Row,
  Title,
} from '../../styles/global.styled';
import { API, INPUT_LABEL, INPUT_TYPE, URL } from '../../utils/constant';
import useCategory from '../../utils/hooks/useCategory';
import useAuthReq from '../../utils/hooks/useReq';

export type PropertyState = {
  name: string | null;
  isNew: boolean;
  isDeleted: boolean;
};

type IModal = {
  open: boolean;
  title: string;
  text: string;
  details: string;
};

const generateProp = (data: any, name: any) => {
  const type = data[`${name}BsonType`].value;
  const required = data[`${name}Required`];
  const description = data[`${name}Description`];
  const title = data[`${name}Title`];
  const bsonType = required ? type : [type, 'null'];
  const items = type === 'array' ? { items: { bsonType: 'string' } } : {};
  return { required, description, title, bsonType, items };
};

const AddCategory = () => {
  const { categoryName } = useParams();
  const methods = useForm({
    defaultValues: {
      kind: categoryName,
    },
  });
  const [modal, setModal] = useState<IModal>({
    open: false,
    title: '',
    text: '',
    details: '',
  });
  const { ctg, getCategory, getID, update } = useCategory();
  const [names, setNames] = useState<PropertyState[]>([]);
  const { send } = useAuthReq(
    categoryName ? 'PUT' : 'POST',
    `${API}${URL.POST_CATEGORIES}`,
    '',
    {
      'Content-Type': 'application/json',
    }
  );

  const handleOpenModal = (isOpen: boolean = false): void => {
    setModal((prev) => ({ ...prev, open: isOpen }));
  };

  const addName = (name: string, index: number) => {
    if (names.findIndex((el) => el.name === name) !== -1) return false;
    setNames((prev) => {
      const state = [...prev];
      state[index] = { name, isNew: true, isDeleted: false };
      return state;
    });
    return true;
  };

  const addProperty = () => {
    if (names.length > 0 && names[names.length - 1].name === '') return false;
    setNames((prev: PropertyState[]) => [
      ...prev,
      { name: '', isNew: true, isDeleted: false },
    ]);
    return true;
  };

  const editProperty = (index: number) => {
    if (!names[index].isNew) {
      send({
        method: 'DELETE',
        url: `${API}${URL.POST_CATEGORIES}/${getID(categoryName || '')}`,
        body: JSON.stringify({
          properties: [names[index].name],
        }),
      });
    }
    setNames((prev) => {
      const state = [...prev];
      state[index] = { ...state[index], isNew: true };
      return state;
    });
  };

  const deleteProperty = (index: number) => {
    const { name } = names[index];
    if (!names[index].isNew) {
      send({
        method: 'DELETE',
        url: `${API}${URL.POST_CATEGORIES}/${getID(categoryName || '')}`,
        body: JSON.stringify({
          properties: [name],
        }),
      });
    }
    setNames((prev) => {
      const state = [...prev];
      state[index] = { ...state[index], isDeleted: true, name: null };
      return state;
    });
    methods.reset({
      ...methods.getValues(),
      [`${name}Title`]: '',
      [`${name}Description`]: '',
      [`${name}BsonType`]: {
        label: '',
        value: '',
      },
      [`${name}Required`]: '',
    });
  };

  useEffect(() => {
    const { properties } = getCategory(categoryName || '', true);
    const fieldName = properties.map((field) => ({
      name: field.name,
      isDeleted: false,
      isNew: false,
    }));
    setNames(fieldName);
    const completeFields = fieldName.reduce((prev, curr, index) => {
      const { bsonType, description, title } = properties[index].metadata;
      const { name } = fieldName[index];
      const type = (
        typeof bsonType === 'string' ? bsonType : bsonType[0]
      ) as Types;
      const required = typeof bsonType === 'string';
      return {
        ...prev,
        [`${name}Title`]: title,
        [`${name}Description`]: description,
        [`${name}BsonType`]: {
          label: INPUT_LABEL[type],
          value: type,
        },
        [`${name}Required`]: required,
      };
    }, {});
    methods.reset({
      ...methods.getValues(),
      ...completeFields,
    });
  }, [ctg?.categories]);

  const addOrEdit = async (kind: any, properties: any, required: any) => {
    if (categoryName) {
      return send({
        url: `${API}${URL.POST_CATEGORIES}/${getID(categoryName || '')}`,
        body: JSON.stringify({
          properties,
        }),
      });
    }
    return send({
      body: JSON.stringify({
        properties: {
          ...properties,
          kind: {
            enum: [kind],
          },
        },
        title: kind,
      }),
    });
  };

  const submit = async (data: any) => {
    const traits = names.filter((name) => !name.isDeleted && name.isNew);

    const body = traits.reduce<{
      properties: object;
      required: string[];
    }>(
      (prev, curr: any) => {
        const prop = generateProp(data, curr.name);
        const { description, title, bsonType, required } = prop;
        return {
          properties: {
            ...prev.properties,
            [curr.name]: {
              description,
              title,
              bsonType,
              ...prop.items,
            },
          },
          required: [...prev.required, ...(required ? [curr.name] : [])],
        };
      },
      {
        properties: {},
        required: [],
      }
    );
    try {
      await addOrEdit(data.kind, body.properties, body.required);
      setModal({
        open: true,
        title: 'Dodanie/Edycja kategorii przebieg??o pomy??lnie',
        text: '',
        details: '',
      });
      update();
    } catch (e: any) {
      console.log({ e });
      setModal({
        open: true,
        title: 'Problem z dodaniem/edycja kategorii',
        text: 'Upewnij si??, ??e wype??ni??e?? wszystkie pola',
        details: JSON.stringify(e?.statusText),
      });
    }
  };

  return (
    <>
      <Header />
      <Breadcrumb />
      <Container>
        <Title>Formularz dodawania/edycji kategorii</Title>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(submit)}>
            <TextInput
              name="kind"
              title="Nazwa rodzaju kategorii"
              required
              placeholder="piwo"
            />
            <p>Dodaj cechy:</p>
            <Col gap="20px">
              {names.map((name, index) => {
                const key = `propertyInput${index}`;
                return (
                  !name.isDeleted && (
                    <PropertyInput
                      key={key}
                      id={index}
                      addName={addName}
                      deleteProperty={deleteProperty}
                      editProperty={editProperty}
                      traits={name}
                    />
                  )
                );
              })}
            </Col>
            <Row justifyContent="flex-end" margin="40px 0 0 0">
              <BtnPrimary type="button" onClick={addProperty}>
                + Dodaj kolejn?? cech??
              </BtnPrimary>
            </Row>
            <Row justifyContent="flex-end" margin="40px 0 0 0">
              <BtnPrimary type="submit">Dodaj/edytuj kategori??</BtnPrimary>
            </Row>
          </form>
        </FormProvider>
        <ErrorModal
          isOpen={modal.open}
          title={modal.title}
          text={modal.text}
          details={modal.details}
          onClose={handleOpenModal}
        />
      </Container>
    </>
  );
};

export default AddCategory;
