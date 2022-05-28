import { Action } from 'redux';

export enum ActionsType {
  TOGGLE_STATUS = '@user/TOGGLE_STATUS',
  SET_STATUS = '@user/SET_STATUS',
  PRESENCE_STATUS_CONNECT = '@user/PRESENCE_STATUS_CONNECT',
}

export enum UserStatus {
  ONLINE = 'online',
  OFFLINE = 'offline',
}

export type UserState = {
  status: UserStatus | null;
  name: string | null
};

export type ToggleStatusAction = Action<ActionsType.TOGGLE_STATUS>;
export type SetStatusAction = Action<ActionsType.SET_STATUS> & {
  payload: {
    status: UserStatus;
  }
};
export type PresenceConnectAction = Action<ActionsType.PRESENCE_STATUS_CONNECT>;
