import { IStoreState } from '../store';
import * as Actions from '../actions';
import { ActionType, getType } from 'typesafe-actions';
export const initializeState: IStoreState = {
  authentication: null,
};

export default (
  state: IStoreState = initializeState,
  action: ActionType<typeof Actions>
) => {
  console.log(state, action);
  switch (action.type) {
    case getType(Actions.successLogin):
      return {
        ...state,
        authentication: { ...action.payload },
      };
    case getType(Actions.successAuth):
      return {
        ...state,
        authentication: { ...action.payload },
      };
    case getType(Actions.successLogout):
      return {
        ...state,
        authentication: null,
      };
    default:
      return { ...state };
  }
};
