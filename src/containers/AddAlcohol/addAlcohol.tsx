/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Link, useParams, useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb/breadcrumb";
import HeaderLogic from "../../components/Header/header.logic";
import FileInput from "../../components/FileInput/fileInput";
import { Form, Title } from "./addAlcohol.styled";
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
} from "../../styles/global.styled";
import Loader from "../../components/Loader/loader";
import Modal from "../../components/modal/Modal";
import { ModalTitle } from "../../components/modal/Modal.styled";
import useCategory from "../../utils/hooks/useCategory";
import CategoryForm from "../../components/CategoryForm/categoryForm";
import { inputType, Options } from "../../@types/inputs";
import { SpecificCategory, Type } from "../../@types/category";
import InputFactory from "../../components/InputFactory/inputFactory";
import {
  API,
  BARCODE_PROPERTY,
  CORE,
  INPUT_TYPE,
  URL,
} from "../../utils/constant";
import MoreInput from "../../components/MoreInput/moreInput";
import useAuthReq from "../../utils/hooks/useReq";
import { getType, createImageName, createFormData } from "../../utils/utils";
import { IReq } from "../../@types/fetch";
import Suggestion from "../../components/Suggestion/suggestion";
import ErrorModal from "../../components/ErrorModal/errorModal";
import useAlcohol from "../../utils/hooks/useAlcohol";
import { IAlcohol } from "../../@types/alcohol";

type IModal = {
  open: boolean;
  title: string;
  text: string;
  details: string;
};

const getValues = (array: any) =>
  array instanceof Array ? array?.map((el: any) => el.value) || [] : [];

const getDouble = (number: number) => {
  const possibleNumber = number.toFixed(2);
  return possibleNumber === "NaN" ? null : possibleNumber;
};

const prepareToSelect = (data: any) =>
  data.map((el: any) => ({
    label: el,
    value: el,
  }));

const prepareBoolean = (value: boolean) => ({
  label: value ? "TAK" : "NIE",
  value,
});

const prepareField = (field: unknown) => {
  if (field instanceof Array) return prepareToSelect(field);
  if (typeof field === "boolean") return prepareBoolean(field);
  return field;
};

const AddAlcohol = () => {
  const methods = useForm({});
  const navigate = useNavigate();
  const { alcoholBarcode } = useParams();
  const [id, setID] = useState<string>("");
  const [modal, setModal] = useState<IModal>({
    open: false,
    title: "",
    text: "",
    details: "",
  });
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imgChanged, setImgChanged] = useState<any>({ sm: false, md: false });
  const [categories, setCategories] = useState<
    SpecificCategory & { kind: string | null }
  >({
    kind: null,
    required: [],
    properties: [],
  });
  const { getCategory, ctg } = useCategory();
  const { send } = useAuthReq("POST", `${API}${URL.POST_ALCOHOLS}`, "");
  const alcohol = useAlcohol(alcoholBarcode) as IAlcohol;

  const prepareValues = (data: any) => {
    const prepareData = categories.properties.reduce(
      (prev, curr) => {
        const { type } = getType(curr.metadata.bsonType);
        if (data[curr.name] === undefined) return { ...prev, [curr.name]: [] };
        if (type === "array")
          return { ...prev, [curr.name]: getValues(data[curr.name]) };
        if (type === "bool")
          return { ...prev, [curr.name]: data[curr.name].value };
        if (type === "double")
          return { ...prev, [curr.name]: getDouble(data[curr.name]) };
        return prev;
      },
      { ...data }
    );
    return prepareData;
  };

  const resetValues = (keys: any) =>
    keys.reduce(
      (prev: any, curr: any) => {
        if (methods.getValues(curr) === undefined)
          return { [curr]: [], ...prev };
        return { [curr]: "", ...prev };
      },
      {
        barcode: [""],
      }
    );

  const modalIsOpen = (isOpen: boolean = false) => {
    setModal((prev) => ({ ...prev, open: isOpen }));
  };

  const handleCompleteFields = async () => {
    console.log({ alcohol });
    if (!alcoholBarcode || !alcohol) return;
    const category = getCategory(alcohol.kind);
    setCategories({ ...category, kind: alcohol.kind });
    const coreValues = CORE.reduce((prev, { name }) => {
      if (["rate_count", "rate_value", "avg_rating"].includes(name))
        return prev;
      const prop = alcohol[name as keyof typeof alcohol];
      const value = { [name]: prepareField(prop) };
      return { ...prev, ...value };
    }, {});
    const additionalValues = alcohol.additional_properties.reduce(
      (prev, { value, name }) => {
        const prop = prepareField(value);
        return { ...prev, [name]: prop };
      },
      {}
    );
    setID(alcohol.id);

    console.log({ coreValues, additionalValues });

    methods.reset({
      ...coreValues,
      ...additionalValues,
      barcode: alcohol.barcode,
      kind: alcohol.kind,
      sm: createImageName(alcohol.name, "sm"),
      md: createImageName(alcohol.name, "md"),
    });
  };

  useEffect(() => {
    handleCompleteFields();
  }, [alcohol]);

  const addMore = () => {
    modalIsOpen(false);
    navigate("/alcohol/add");
  };

  const chooseCategory = async ({ kind }: Options) => {
    setCategories({ ...getCategory(kind.value), kind: kind.value });
  };

  const addOrEdit = async (data: any, sm: any, md: any) => {
    const req = {
      body: JSON.stringify({ ...data }),
      header: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      ...(alcoholBarcode
        ? {
            method: "PUT",
            url: `${API}${URL.POST_ALCOHOLS}/${id}`,
          }
        : {}),
    };
    const result = await send({ ...req } as IReq);
    if (![200, 201].includes(result.status))
      throw new Error("It is problem with add alcohol!");

    if ((!!alcoholBarcode && imgChanged.sm) || !alcoholBarcode) {
      const formDataSM = createFormData([
        ["image_name", createImageName(data.name, "sm")],
        ["file", sm],
      ]);
      const resSM = await send({
        url: `${API}${URL.UPLOAD_IMAGE}`,
        body: formDataSM,
      });

      if (resSM.status !== 201)
        throw new Error("It is problem with add alcohol's small image !");
    }

    if ((!!alcoholBarcode && imgChanged.md) || !alcoholBarcode) {
      const formDataMD = createFormData([
        ["image_name", createImageName(data.name, "md")],
        ["file", md],
      ]);
      const resMD = await send({
        url: `${API}${URL.UPLOAD_IMAGE}`,
        body: formDataMD,
        header: { Accept: "*/*" },
      });

      if (resMD.status !== 201)
        throw new Error("It is problem with add alcohol's medium image");
    }

    return result;
  };

  const removeImage = async (type: string) => {
    methods.reset({ ...methods.getValues(), [type]: null });
    setImgChanged((prev: any) => ({ ...prev, [type]: true }));
  };

  const submit = async (data: any) => {
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
      setModal({
        open: true,
        title: "Problem z dodaniem/edycją alkoholu",
        text: "Upewnij się, że wszystkie pola są poprawnie wypełnione",
        details: JSON.stringify(e?.statusText),
      });
    } finally {
      setIsLoading(false);
      modalIsOpen(true);
    }
  };

  return (
    <>
      <HeaderLogic />
      <Breadcrumb />
      <Container>
        <Title>Formularz dodawania/edycji alkoholu</Title>
        <CategoryForm submit={chooseCategory} kindName={categories.kind} />
        {!!categories.properties.length && (
          <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(submit)}>
              <MoreInput
                name="barcode"
                title="Kod kreskowy"
                required
                placeholder="9501101531000"
              />
              {categories.properties.map((input) => {
                const { bsonType, title, description } = input.metadata;
                const { name } = input;
                const { type, required } = getType(bsonType);
                return (
                  <InputFactory
                    key={name}
                    type={type}
                    name={name}
                    title={title}
                    required={required}
                    placeholder={description}
                  />
                );
              })}
              <Row gap="10px">
                <FileInput
                  name="sm"
                  title="Małe zdjęcie 300 X 400 (Należy dodać zdjęcie skompresowane):"
                  required
                  remove={removeImage}
                  imageName={methods.getValues("sm")}
                  placeholder="sm"
                />
                <FileInput
                  name="md"
                  title="Duże zdjęcie 600 X 800 (Należy dodać zdjęcie skompresowane):"
                  required
                  remove={removeImage}
                  imageName={methods.getValues("md")}
                  placeholder="md"
                />
              </Row>
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
      <Modal isOpen={modal.open && isValid} onClose={modalIsOpen}>
        <ModalTitle>Alkohol został dodany prawidłowo</ModalTitle>
        <Row gap="20px">
          <BtnPrimary onClick={addMore}>Dodaje kolejny alkohol</BtnPrimary>
          <LinkSecondary to="/alcohol">Wracam do listy alkoholi</LinkSecondary>
        </Row>
      </Modal>
      <ErrorModal
        isOpen={modal.open && !isValid}
        title={modal.title}
        text={modal.text}
        details={modal.details}
        onClose={modalIsOpen}
      />
      <Suggestion />
    </>
  );
};

export default AddAlcohol;
