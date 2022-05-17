import React from 'react';
import { useFormContext } from 'react-hook-form';
import { IProps } from '../../@types/inputs';

const FileInput = () => {
  const { register } = useFormContext();
  return (
    <div>
      <p>Zdjęcia:</p>
      <input {...register('file')} type="file" />
    </div>
  );
};

export default FileInput;
