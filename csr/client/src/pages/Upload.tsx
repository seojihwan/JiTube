import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { UplaodModal } from '../component';
import { IStoreState } from '../store';

export const Upload: React.FC = () => {
  const auth = useSelector((store: IStoreState) => store.authentication);
  return auth ? (
    <>
      <UplaodModal />
    </>
  ) : (
    <Redirect to="/login" />
  );
};
