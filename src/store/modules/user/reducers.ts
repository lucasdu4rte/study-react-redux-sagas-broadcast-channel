import produce from 'immer';
import { Reducer } from 'redux';
import { ActionsType, UserState, UserStatus } from './types';

const initialState: UserState = {
  status: UserStatus.OFFLINE,
  name: 'Richard Sanchez',
};

export const userReducers: Reducer<UserState> = (
  state = initialState,
  { type, payload }
) => {
  return produce(state, (draft) => {
    switch (type) {
      case ActionsType.SET_STATUS: {
        draft.status = payload.status;

        break;
      }
      case ActionsType.TOGGLE_STATUS: {
        draft.status = draft.status === UserStatus.ONLINE ? UserStatus.OFFLINE : UserStatus.ONLINE;

        break;
      }
      default:
    }
  });
};
