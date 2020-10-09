import { IStoreState } from '../store';
import * as Actions from '../actions';
import { ActionType, getType } from 'typesafe-actions';
export const initializeState: IStoreState = {
  authentication: false,
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
        authentication: true,
      };
    case getType(Actions.successLogout):
      return {
        ...state,
        authentication: false,
      };
    default:
      return { ...state };
  }
};
