import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FileUploader } from 'react-drag-drop-files';
import { Trash2 } from 'react-feather';
import { IProps } from '../../@types/inputs';
import { Col, Row } from '../../styles/global.styled';
import {
  Preview,
  FileStyle,
  BtnDelete,
  ImgPreview,
  Title,
} from './fileInput.styled';

const FileInput = ({
  name,
  title,
  required,
  remove,
}: IProps & { remove: (type: string) => void }) => {
  const { control } = useFormContext();
  const [img, setImg] = useState<string>('');

  const onImageChange = (file: any) => {
    setImg(URL.createObjectURL(file));
  };

  const handleRemove = async () => {
    try {
      await remove(name);
      setImg('');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Row justifyContent="center" margin="20px 0" flex="1" position="relative">
      <FileStyle />
      <Controller
        name={name}
        control={control}
        rules={{ required }}
        render={({ field }) => (
          <FileUploader
            {...field}
            name="file"
            types={['PNG']}
            classes="file-uploader"
            label={title}
            handleChange={(file: any) => {
              onImageChange(file);
              field.onChange(file);
            }}
          />
        )}
      />
      {img && (
        <Preview>
          <BtnDelete type="button" onClick={() => handleRemove()}>
            <Trash2 size={18} />
          </BtnDelete>
          <ImgPreview src={img} alt="This introduce choosen alcohol" />
        </Preview>
      )}
    </Row>
  );
};

export default FileInput;
