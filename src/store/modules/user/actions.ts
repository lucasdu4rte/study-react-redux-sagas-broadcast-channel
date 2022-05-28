import { ActionCreator } from 'redux';
import {
  ActionsType,
  ToggleStatusAction,
  SetStatusAction,
  PresenceConnectAction,
  UserStatus,
} from './types';

export const toggleStatus: ActionCreator<ToggleStatusAction> = () => ({
  type: ActionsType.TOGGLE_STATUS,
})
export const setStatus: ActionCreator<SetStatusAction> = (status: UserStatus) => ({
  type: ActionsType.SET_STATUS,
  payload: {
    status,
  },
})
export const presenceConnect: ActionCreator<PresenceConnectAction> = () => ({
  type: ActionsType.PRESENCE_STATUS_CONNECT,
})
