import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { IProps } from '../../@types/inputs';

const MoreInput = ({ name, show_name }: IProps) => {
  const { register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name,
  });

  return (
    <div>
      <p>{show_name}: </p>
      <ul>
        {fields.map((item, index) => (
          <li key={item.id}>
            <input {...register(`${name}[${index}]`, { required: true })} />
            {!!index && (
              <button type="button" onClick={() => remove(index)}>
                Usuń
              </button>
            )}
          </li>
        ))}
      </ul>
      <button type="button" onClick={() => append('')}>
        Dodaj
      </button>
    </div>
  );
};

export default MoreInput;
