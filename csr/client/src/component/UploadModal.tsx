import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { requestVideoUpload } from '../actions';
import { IStoreState } from '../store';
import {
  Modal,
  ModalForm,
  ModalTitle,
  ModalTitleName,
  ModalTitleButton,
  ModalFileDragAndDrop,
  ModalUploadDescription,
  ModalUploadImage,
  ModalFileDragAndDropButton,
  ModalVideoInfo,
  ModalVideoTitleInput,
  ModalVideoDescriptionInput,
  ModalVideoUploadButton,
} from './styles';

export const UplaodModal = () => {
  const auth = useSelector((store: IStoreState) => store.authentication);
  const dispatch = useDispatch();
  const [file, setFile] = useState<File>();
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isUpload, setIsUpload] = useState<boolean>(true);
  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    console.log(acceptedFiles);
    setFile(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const cancelClick = () => {
    setIsUpload(false);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (auth && file) {
      const formData = new FormData();
      formData.append('video', file);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('user_id', auth.user_id);
      dispatch(requestVideoUpload(formData));
    }
    setIsUpload(false);
  };

  const titleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  const descriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.currentTarget.value);
  };
  return (
    <>
      <Modal isUpload={isUpload} onClick={cancelClick} />
      <ModalForm onSubmit={onSubmit} isUpload={isUpload}>
        <ModalTitle>
          <ModalTitleName>동영상 업로드</ModalTitleName>
          <ModalTitleButton onClick={cancelClick}></ModalTitleButton>
        </ModalTitle>
        <ModalFileDragAndDrop {...getRootProps()}>
          <ModalUploadImage />
          <ModalUploadDescription>
            동영상 파일을 드래그 앤 드롭하여 업로드
          </ModalUploadDescription>
          <input {...getInputProps()} accept="video/mp4,video/x-m4v" />
          <ModalFileDragAndDropButton type="button">
            파일 선택
          </ModalFileDragAndDropButton>
        </ModalFileDragAndDrop>
        <ModalVideoInfo>
          {file ? <div>{file.name}</div> : <div></div>}
          <ModalVideoTitleInput
            onChange={titleChange}
            value={title}
            placeholder="제목"
          />
          <ModalVideoDescriptionInput
            onChange={descriptionChange}
            value={description}
            placeholder="내용"
          />
          <ModalVideoUploadButton disabled={!file || !title}>
            업로드
          </ModalVideoUploadButton>
        </ModalVideoInfo>
      </ModalForm>
    </>
  );
};
