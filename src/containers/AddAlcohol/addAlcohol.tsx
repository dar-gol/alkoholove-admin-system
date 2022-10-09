/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useEffect, useState } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import FileInput from "../../components/FileInput/fileInput";
import { Form, SectionBar, Title } from "./addAlcohol.styled";
import {
  BtnPrimary,
  CapitalCase,
  Col,
  Content,
  InfoBar,
  LinkSecondary,
  Row,
  ScrollContent,
} from "../../styles/global.styled";
import Loader from "../../components/Loader/loader";
import Modal from "../../components/modal/Modal";
import { ModalTitle } from "../../components/modal/Modal.styled";
import useCategory from "../../utils/hooks/useCategory";
import { Property, SpecificCategory, Type } from "../../@types/category";
import InputFactory from "../../components/InputFactory/inputFactory";
import { API, CORE, URL } from "../../utils/constant";
import useAuthReq from "../../utils/hooks/useReq";
import { getType, createImageName, createFormData } from "../../utils/utils";
import { IReq } from "../../@types/fetch";
import Suggestion from "../../components/Suggestion/suggestion";
import ErrorModal from "../../components/ErrorModal/errorModal";
import useAlcohol from "../../utils/hooks/useAlcohol";
import { IAlcohol } from "../../@types/alcohol";
import withDashboardWrapper from "../../utils/hoc/withDashboardWrapper";
import CategorySelect from "../../components/Inputs/CategorySelect";
import Indicator from "../../components/Indicator/Indicator";
import TemporaryAlcoholStorage from "../../components/TemporaryAlcoholStorage/TemporaryAlcoholStorage";

type IModal = {
  open: boolean;
  title: string;
  text: string;
  details: string;
};

const getValues = (array: any) =>
  array instanceof Array ? array?.map((el: any) => el.value) || [] : [];

const getDouble = (number: string) => {
  const possibleNumber = Number(number).toFixed(2);
  return possibleNumber === "NaN" ? null : possibleNumber;
};

const prepareToSelect = (data: any) =>
  data.map((el: any) => ({
    label: el,
    value: el,
  }));

const prepareField = (field: unknown) => {
  if (field instanceof Array) return prepareToSelect(field);
  return field;
};

const AddAlcohol = () => {
  const methods = useForm({});
  const navigate = useNavigate();
  const location = useLocation();
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
    core: {
      required: [],
      properties: [],
    },
    additional: { required: [], properties: [] },
  });
  const { getCategory, ctg } = useCategory();
  const { send } = useAuthReq("POST", `${API}${URL.POST_ALCOHOLS}`, "");
  const alcohol = useAlcohol(alcoholBarcode) as IAlcohol;

  const prepareValues = (data: any) => {
    const coreProp = categories.core.properties;
    const additionalProp = categories.additional.properties;
    const prop = [...coreProp, ...additionalProp];
    const prepareData = prop.reduce(
      (prev, curr) => {
        const { type } = getType(curr.metadata.bsonType);
        if (data[curr.name] === undefined && type === "array")
          return { ...prev, [curr.name]: [] };
        if (type === "array")
          return { ...prev, [curr.name]: getValues(data[curr.name]) };
        if (type === "bool") return { ...prev, [curr.name]: data[curr.name] };
        if (type === "double")
          return { ...prev, [curr.name]: getDouble(data[curr.name]) };
        if (type === "int" || type === "long")
          return { ...prev, [curr.name]: Number(data[curr.name]) };
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
    if (!alcoholBarcode || !alcohol) {
      // methods.reset(resetValues(Object.keys(alcohol)));
      return null;
    }
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

    methods.reset({
      ...coreValues,
      ...additionalValues,
      kind: alcohol.kind,
      sm: createImageName(alcohol.name, "sm"),
      md: createImageName(alcohol.name, "md"),
    });
    return null;
  };

  useEffect(() => {
    handleCompleteFields();
  }, [alcohol, location.pathname, ctg?.categories]);

  const addMore = () => {
    modalIsOpen(false);
    navigate("/alcohol/add");
  };

  const chooseCategory = async (kind: { label: string; value: string }) => {
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

  const setToStorage = () => {
    const values = methods.getValues();
    localStorage.setItem(
      "alcohol_form",
      JSON.stringify({
        ...values,
        kind: categories.kind,
      })
    );
  };

  const readFromStorage = () => {
    const storage = localStorage.getItem("alcohol_form");
    if (storage) {
      const data = JSON.parse(storage);
      data.sm = undefined;
      data.md = undefined;
      methods.reset({ ...data });
      const category = getCategory(data.kind);
      setCategories({ ...category, kind: data.kind });
    }
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

  const setValue = (value: unknown) => {
    if (!value) return "";
    if (value instanceof Array && value.length === 0) return "";
    return value;
  };

  const setInput = (name: string, value: string) => {
    let valueToSet = value;
    try {
      valueToSet = JSON.parse(value);
    } catch (e: any) {
      console.log({ e });
    }
    methods.reset({
      ...methods.getValues(),
      [name]: valueToSet,
    });
  };

  const createRowInput = (input: Property) => {
    const { bsonType, title, description } = input.metadata;
    const { name } = input;
    const { type, required } = getType(bsonType);
    return (
      <Col
        key={`asdasfsdfsddsfsdfsdfsdf${name}`}
        margin="0 0 20px 0"
        minHeight="56px"
      >
        <Controller
          control={methods.control}
          name={name}
          render={({ field }) => {
            const t = 0;
            return (
              <InputFactory
                value={setValue(field.value)}
                onChange={field.onChange}
                inputRef={field.ref}
                setValue={(value: unknown) => methods.setValue(name, value)}
                type={type}
                name={name}
                title={title}
                required={required}
                placeholder={description}
              />
            );
          }}
        />
      </Col>
    );
  };

  return (
    <>
      <Content flex="1" width="100%" maxWidth="756px" gap="20px">
        <Title>
          Formularz {alcoholBarcode ? "edycji" : "dodawania"} alkoholu
        </Title>
        <Col margin="0px 80px" minHeight="56px">
          <CategorySelect
            isAll={false}
            value={
              categories.kind && {
                label: categories.kind,
                value: categories.kind,
              }
            }
            onChange={chooseCategory}
            title="Wybierz kategorię alkoholu"
          />
        </Col>
        <Col margin="0 80px" visible={!categories.core.properties.length}>
          <InfoBar margin="0 0 20px 0">
            <span className="icon-Info" />
            <p>
              Pierwszym krokiem wprowadzenia nowego alkoholu jest wybranie
              kategorii. W celu wybrania kategorii należy kliknąć na input
              znajdujący się powyżej.
            </p>
          </InfoBar>
        </Col>
        <ScrollContent
          padding="0 0 20px 0"
          visible={!!categories.core.properties.length}
        >
          <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(submit)}>
              <SectionBar>
                <p>Podstawowe informacje</p>
              </SectionBar>
              <InfoBar margin="0 0 20px 0">
                <span className="icon-Info" />
                <p>
                  Input ponizej pozwala na wprowadzenie kilku wartości. Aby
                  zaakceptować wpisanie wartości nalezy wcisnąć przycisk
                  tabulacji.
                </p>
              </InfoBar>
              {categories.core.properties.map((input) => createRowInput(input))}
              {!!categories.additional.properties.length && (
                <SectionBar>
                  <p>
                    Dodatkowe informacje o:{" "}
                    <CapitalCase>{categories.kind}</CapitalCase>
                  </p>
                </SectionBar>
              )}
              {categories.additional.properties.map((input) =>
                createRowInput(input)
              )}
              <SectionBar>
                <p>Zdjęcia alkoholu</p>
              </SectionBar>
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
              <Row justifyContent="center">
                <BtnPrimary type="submit" margin="20px 0" width="200px">
                  {alcoholBarcode ? "Edytuj" : "Dodaj"} alkohol
                </BtnPrimary>
              </Row>
            </Form>
          </FormProvider>
        </ScrollContent>
      </Content>
      <Modal isOpen={isLoading} onClose={() => {}} isClosable={false}>
        <ModalTitle>
          {alcoholBarcode ? "Edytujemy" : "Dodajemy"} nowy alkohol
        </ModalTitle>
        <Row justifyContent="center">
          <Loader />
        </Row>
      </Modal>
      <Modal isOpen={modal.open && isValid} onClose={modalIsOpen}>
        <ModalTitle>
          Alkohol został {alcoholBarcode ? "zedytowany" : "dodany"} prawidłowo
        </ModalTitle>
        <Row gap="20px">
          <BtnPrimary onClick={addMore}>Dodaje kolejny alkohol</BtnPrimary>
          <LinkSecondary to="/alcohol">Wracam do listy alkoholi</LinkSecondary>
        </Row>
      </Modal>
      <ErrorModal
        isOpen={modal.open && !isValid}
        title={modal.title}
        text={`${modal.text}. Pamiętaj w prawym dolnym rogu jest możliwość zapisania danych w przeglądarce!`}
        details={modal.details}
        onClose={modalIsOpen}
      />
      {!alcoholBarcode && <Suggestion setInput={setInput} />}
      <TemporaryAlcoholStorage
        setToStorage={setToStorage}
        readFromStorage={readFromStorage}
      />
    </>
  );
};

export default withDashboardWrapper(AddAlcohol);
