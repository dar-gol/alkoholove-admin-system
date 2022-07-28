import React, { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { IProps } from '../../@types/inputs';
import {
  BtnPrimary,
  BtnSecondary,
  Col,
  InputText,
  Label,
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
      <Label>{title}: </Label>
      <Col gap="10px">
        {fields.map((item, index) => (
          <Row key={item.id} gap="20px" flex="1">
            <InputText
              {...register(`${name}[${index}]`, { required: true })}
              placeholder={placeholder}
              onKeyDown={(e: any) => e.key === 'Enter' && e.preventDefault()}
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
