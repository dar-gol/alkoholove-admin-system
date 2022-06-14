import React, { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { IProps } from '../../@types/inputs';
import {
  BtnPrimary,
  BtnSecondary,
  Col,
  InputText,
  Row,
} from '../../styles/global.styled';

const MoreInput = ({ name, title, placeholder }: IProps) => {
  const { alcoholBarcode } = useParams();
  const { register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name,
  });

  useEffect(() => {
    if (alcoholBarcode) return;
    append('');
  }, []);

  return (
    <div>
      <p>{title}: </p>
      <Col gap="10px">
        {fields.map((item, index) => (
          <Row key={item.id} gap="20px" flex="1">
            <InputText
              {...register(`${name}[${index}]`, { required: true })}
              placeholder={placeholder}
            />
            {!!index && (
              <BtnSecondary type="button" onClick={() => remove(index)}>
                Usuń
              </BtnSecondary>
            )}
          </Row>
        ))}
      </Col>
      <BtnPrimary margin="20px 0 0 0" type="button" onClick={() => append('')}>
        Dodaj kolejny kod kreskowy
      </BtnPrimary>
    </div>
  );
};

export default MoreInput;
