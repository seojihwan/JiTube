import React, { useCallback, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { requestVideoUpload } from '../actions';
import { IStoreState } from '../store';

export const Upload: React.FC = () => {
  const auth = useSelector((store: IStoreState) => store.authentication);

  const dispatch = useDispatch();
  const [file, setFile] = useState<File>();
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    console.log(acceptedFiles);
    setFile(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (auth) {
      const formData = new FormData();
      formData.append('video', file as File);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('user_id', auth.user_id);
      dispatch(requestVideoUpload(formData));
    }
  };

  const titleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  const descriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.currentTarget.value);
  };

  return auth ? (
    <div>
      <form onSubmit={onSubmit}>
        <div {...getRootProps()}>
          업로드
          <input {...getInputProps()} />
        </div>
        <input onChange={titleChange} value={title} />
        <input onChange={descriptionChange} value={description} />
        <button disabled={!file || !title}>업로드</button>
      </form>
    </div>
  ) : (
    <Redirect to="/login" />
  );
};
