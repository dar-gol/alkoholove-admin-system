import React, { useEffect, useState } from 'react';
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
  PreviewBlock,
  Title,
} from './fileInput.styled';
import { URL as URLS } from '../../utils/constant';

const FileInput = ({
  name,
  title,
  required,
  remove,
  imageName,
}: IProps & { remove: (type: string) => void; imageName?: string }) => {
  const { control, setValue, getValues } = useFormContext();
  const [img, setImg] = useState<string>(
    imageName ? `${URLS.GET_IMAGE}/${imageName}` : ''
  );

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

  useEffect(() => {
    if (!imageName) setImg('');
  }, [imageName]);

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
          <PreviewBlock>
            <ImgPreview
              src={`${img}#t?t=${new Date().getTime()}`}
              alt="This introduce choosen alcohol"
            />
          </PreviewBlock>
        </Preview>
      )}
    </Row>
  );
};

FileInput.defaultProps = {
  imageName: '',
};

export default FileInput;
