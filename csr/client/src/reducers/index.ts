import { IStoreState } from '../store';
import * as Actions from '../actions';
import { ActionType, getType } from 'typesafe-actions';
export const initializeState: IStoreState = {
  authentication: null,
  videos: null,
  currentPageVideo: null,
  currentPageUserVideo: null,
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
    case getType(Actions.successGetAllVideos):
      return {
        ...state,
        videos: action.payload,
      };
    case getType(Actions.successGetOneVideo):
      return {
        ...state,
        currentPageVideo: action.payload,
      };
    case getType(Actions.successGetUserAllVideos):
      return {
        ...state,
        currentPageUserVideos: action.payload,
      };
    case getType(Actions.requestClearOneVideo):
      return {
        ...state,
        currentPageVideo: null,
      };
    default:
      return { ...state };
  }
};
