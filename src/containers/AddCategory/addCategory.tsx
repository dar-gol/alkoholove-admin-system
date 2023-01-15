import React, { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { Types } from "../../@types/category";
import ErrorModal from "../../components/ErrorModal/errorModal";
import PropertyInput from "../../components/PropertyInput/propertyInput";
import {
  BtnPrimary,
  Col,
  Content,
  CriticalBar,
  GreenBar,
  InfoBar,
  Row,
  ScrollContent,
} from "../../styles/global.styled";
import { API, INPUT_LABEL, INPUT_TYPE, URL } from "../../utils/constant";
import withDashboardWrapper from "../../utils/hoc/withDashboardWrapper";
import useCategory from "../../utils/hooks/useCategory";
import useAuthReq from "../../utils/hooks/useReq";
import { Form, SectionBar, Title } from "../AddAlcohol/addAlcohol.styled";
import { PropertyBtn } from "./addCategory.styled";
import TextInput from "../../components/Inputs/TextInput";

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
  isError: boolean;
};

const generateProp = (data: any, name: any) => {
  const type = data[`${name}BsonType`].value;
  const required = data[`${name}Required`];
  const description = data[`${name}Placeholder`];
  const title = data[`${name}Title`];
  const bsonType = required ? type : [type, "null"];
  const items = type === "array" ? { items: { bsonType: "string" } } : {};
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
    title: "",
    text: "",
    details: "",
    isError: false,
  });
  const { ctg, getCategory, getID, update } = useCategory();
  const [names, setNames] = useState<PropertyState[]>([]);
  const { send } = useAuthReq(
    categoryName ? "PUT" : "POST",
    `${API}${URL.POST_CATEGORIES}`,
    "",
    {
      "Content-Type": "application/json",
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
    if (names.length > 0 && names[names.length - 1].name === "") return false;
    setNames((prev: PropertyState[]) => [
      ...prev,
      { name: "", isNew: true, isDeleted: false },
    ]);
    return true;
  };

  const editProperty = (index: number) => {
    if (!names[index].isNew) {
      send({
        method: "DELETE",
        url: `${API}${URL.POST_CATEGORIES}/${getID(categoryName || "")}`,
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
        method: "DELETE",
        url: `${API}${URL.POST_CATEGORIES}/${getID(categoryName || "")}`,
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
      [`${name}Title`]: "",
      [`${name}Description`]: "",
      [`${name}BsonType`]: {
        label: "",
        value: "",
      },
      [`${name}Required`]: "",
    });
  };

  useEffect(() => {
    const { core, additional } = getCategory(categoryName || "", true);
    const coreFieldName = core.properties.map((field) => ({
      name: field.name,
      isDeleted: false,
      isNew: false,
    }));
    const additinalFieldName = additional.properties.map((field) => ({
      name: field.name,
      isDeleted: false,
      isNew: false,
    }));
    const properties = { ...core.properties, ...additional.properties };
    const fieldName = [...coreFieldName, ...additinalFieldName];
    setNames(fieldName);
    const completeFields = fieldName.reduce((prev, curr, index) => {
      const { bsonType, description, title } = properties[index].metadata;
      const { name } = fieldName[index];
      const type = (
        typeof bsonType === "string" ? bsonType : bsonType[0]
      ) as Types;
      const required = typeof bsonType === "string";
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
        url: `${API}${URL.POST_CATEGORIES}/${getID(categoryName || "")}`,
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
        title: "Dodanie kategorii przebiegło pomyślnie",
        text: "",
        details: "",
        isError: false,
      });
      update();
    } catch (e: any) {
      console.log({ e });
      setModal({
        open: true,
        title: "Problem z dodaniem kategorii",
        text: "Upewnij się, że wypełniłeś wszystkie pola",
        details: JSON.stringify(e?.statusText),
        isError: true,
      });
    }
  };

  return (
    <>
      <Content flex="1" width="100%" maxWidth="756px" gap="20px">
        <Title>Formularz dodawania kategorii</Title>
        <ScrollContent padding="0 0 20px 0">
          <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(submit)}>
              <Col
                key="asdasfsdfsddsfsdfsdfsdfkind"
                margin="0 0 20px 0"
                minHeight="56px"
              >
                <Controller
                  control={methods.control}
                  name="kind"
                  render={({ field }) => (
                    <TextInput
                      type="text"
                      icon="icon-Category"
                      state=""
                      error=""
                      name="kind"
                      title="Nazwa rodzaju kategorii"
                      required
                      placeholder="Piwo"
                      value={field.value}
                      onChange={field.onChange}
                      inputRef={field.ref}
                    />
                  )}
                />
              </Col>
              <SectionBar>
                <p>Dodatkowe cechy kategorii</p>
              </SectionBar>
              <InfoBar margin="0 0 0 0">
                <span className="icon-Info" />
                <p>
                  W celu wprowadzenia nowej cechy do kategorii należy nacisnąć
                  na poniższy przycisk z ikonką plusa (+). Każda kategoria
                  dziedziczy cechy z podstawowej kategorii (core). Jeśli nie
                  masz pewności czy cecha znajduje się w podstawowej kategorii,
                  upewnij się klikając{" "}
                  <Link to="/category/core" target="_blank">
                    tutaj
                  </Link>
                  .
                </p>
              </InfoBar>
              <Col gap="20px" margin="20px 0 0 0" visible={names?.length !== 0}>
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
              <Row justifyContent="flex-end" margin="20px 0 0 0">
                <PropertyBtn
                  type="button"
                  onClick={addProperty}
                  title="Dodaj cechę do kategorii"
                >
                  +
                </PropertyBtn>
              </Row>
              <Row justifyContent="center" margin="40px 0 0 0">
                <BtnPrimary width="200px" type="submit" disabled={false}>
                  Dodaj kategorię
                </BtnPrimary>
              </Row>
            </Form>
          </FormProvider>
        </ScrollContent>
      </Content>
      <ErrorModal
        isOpen={modal.open}
        title={modal.title}
        details={modal.details}
        onClose={handleOpenModal}
      >
        <CriticalBar visible={modal.isError} margin="0 0 20px 0">
          <span className="icon-Error" />
          <p>{modal.text}</p>
        </CriticalBar>
        <GreenBar visible={!modal.isError} margin="0 0 20px 0">
          <span className="icon-Success" />
          <p>
            Kategoria dodana poprawnie,{" "}
            <Link to={`/category/${methods.getValues().kind}`} target="_blank">
              tutaj
            </Link>{" "}
            możesz zobaczyć dodaną kategorię
          </p>
        </GreenBar>
      </ErrorModal>
    </>
  );
};

export default withDashboardWrapper(AddCategory);
