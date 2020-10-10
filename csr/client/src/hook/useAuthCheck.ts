import { useSelector } from 'react-redux';
import { IStoreState } from '../store';

export const useAuthCheck = () => {
  const auth = useSelector((state: IStoreState) => state.authentication);
  return auth;
};
