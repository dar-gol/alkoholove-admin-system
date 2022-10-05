import { FileUploader } from "react-drag-drop-files";
import styled, { createGlobalStyle } from "styled-components";

export const Preview = styled.div`
  position: absolute;
  top: 2px;
  left: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100% - 8px);
  width: calc(100% - 8px);
  margin: 2px;
  background-color: ${({
    theme,
  }: {
    theme: { palette: { Grey40: string; White: string } };
  }) => theme.palette.White};
  border-radius: 20px;
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
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  align-items: center;
`;

export const FileStyle = createGlobalStyle`
  .file-uploader {
    min-width: unset;
    min-height: unset;
    height: 300px;
    padding: 0;
    flex-grow: 1;
    border-color: ${({ theme }: { theme: { palette: { Grey40: string } } }) =>
      theme.palette.Grey40};
    flex-direction: column;
    justify-content: center;
    gap: 30px;
    border-radius: 20px;
  }
  .file-uploader svg {
    transform: scale(1.5);
  }

  .file-uploader svg path {
    fill: ${({
      theme,
    }: {
      theme: { palette: { Grey60: string; Grey40: string } };
    }) => theme.palette.Grey60};
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
  display: ${({ hide }: { hide?: boolean }) => (hide ? "none" : "block")};
`;
