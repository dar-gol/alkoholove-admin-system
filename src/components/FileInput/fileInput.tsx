import React from 'react';
import { useFormContext } from 'react-hook-form';
import { IProps } from '../../@types/inputs';

const FileInput = ({ name, title, required }: IProps) => {
  const { register } = useFormContext();
  return (
    <div>
      <p>{title}</p>
      <input {...register(name, { required })} type="file" />
    </div>
  );
};

export default FileInput;
