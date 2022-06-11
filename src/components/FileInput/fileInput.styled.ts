import { FileUploader } from 'react-drag-drop-files';
import styled, { createGlobalStyle } from 'styled-components';

export const Preview = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: white;
  border: 2px dashed #f47521;
  border-radius: 10px;
`;

export const ImgPreview = styled.img`
  width: 100%;
`;

export const Title = styled.p`
  font-size: 14px;
`;

export const PreviewBlock = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
`;

export const FileStyle = createGlobalStyle`
  .file-uploader {
    min-width: unset;
    max-width: unset;
    height: 400px;
    flex-grow: 1;
    border-color: #F47521;
    flex-direction: column;
    justify-content: center;
    gap: 30px;
  }
  .file-uploader svg {
    transform: scale(2);
  }

  .file-uploader svg path {
    fill: #F47521;
  }

  .file-uploader > div {
    gap: 10px;
    flex-grow: 0;
    flex-direction: column;
  }

  .file-uploader > div > span {
    text-align: center;
    max-width: unset !important;
  }

  .file-uploader > div > span.file-types {
    font-weight: 600;
  }
`;

export const BtnDelete = styled.button`
  font-weight: 900;
  font-size: 20px;
  position: absolute;
  top: -10px;
  right: -8px;
  height: 35px;
  width: 35px;
  border: 0;
  border-radius: 100%;
  background-color: #d75252;
  color: white;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  display: ${({ hide }: { hide?: boolean }) => (hide ? 'none' : 'block')};
`;
