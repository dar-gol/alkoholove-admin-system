import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { Form } from '../../containers/AddAlcohol/addAlcohol.styled';
import {
  BtnPrimary,
  Col,
  LinkSecondary,
  Row,
} from '../../styles/global.styled';
import useCategory from '../../utils/hooks/useCategory';

interface IProps {
  submit: (data: any) => Promise<void>;
  kindName: string | null;
}

const CategoryForm = ({ submit, kindName }: IProps) => {
  const { control, handleSubmit, reset } = useForm({});
  const { getNames } = useCategory();

  const options = getNames()?.map((name) => ({ label: name, value: name }));

  React.useEffect(() => {
    if (!kindName) return;
    reset({
      kind: {
        label: kindName,
        value: kindName,
      },
    });
  }, [kindName]);

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
        <LinkSecondary to="/category/add">Dodaj kategorię</LinkSecondary>
      </Row>
    </Form>
  );
};

export default CategoryForm;
