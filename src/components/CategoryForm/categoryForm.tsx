import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { Form } from '../../containers/AddAlcohol/addAlcohol.styled';
import { BtnPrimary, BtnSecondary, Col, Row } from '../../styles/global.styled';
import useCategory from '../../utils/hooks/useCategory';

interface IProps {
  submit: (data: any) => Promise<void>;
}

const CategoryForm = ({ submit }: IProps) => {
  const { control, handleSubmit } = useForm({});
  const { getNames } = useCategory();

  const options = getNames()?.map((name) => ({ label: name, value: name }));

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <Row gap="20px">
        <Col flex="1">
          <Controller
            name="kind"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <Select options={options} {...field} />}
          />
        </Col>
        <BtnPrimary type="submit">Wybierz kategorię</BtnPrimary>
        <BtnSecondary>Dodaj kategorię</BtnSecondary>
      </Row>
    </Form>
  );
};

export default CategoryForm;
