import { Predicate } from '@redux-saga/types';
import { BroadcastChannel } from 'broadcast-channel';
import { Action } from 'redux';
import { eventChannel } from 'redux-saga';
import { takeLatest, all, select, call, put, take, fork } from 'redux-saga/effects';
import { ApplicationState } from '../types';
import { setStatus } from './actions';
import { ActionsType, UserStatus } from './types';

const getStatus = (state: ApplicationState) => state.user.status

type TakeActions = {
  type: ActionsType;
}

const PRESENCE_STATUS_KEY = '@user/presence-status';

export const createChannel = (ws: BroadcastChannel) => {
  return eventChannel(emitter => {
    ws.onmessage = (data) => {
      emitter(setStatus(data.status))
    }
    return () => ws.close();
  })
}

function* broadcastMessageSender(ws: BroadcastChannel) {
  while (true) {
    const { type: actionKey }: TakeActions = yield take();

    switch (actionKey) {
      case ActionsType.TOGGLE_STATUS:
        const currentStatus: UserStatus = yield select(getStatus)
        localStorage.setItem(PRESENCE_STATUS_KEY, currentStatus);
        ws.postMessage({
          status: currentStatus,
        });
        break;
      default:
        break;
    }
  }
}

export function* broadcastManager() {
  // Iniciamos o canal de comunicação
  const channel = new BroadcastChannel(PRESENCE_STATUS_KEY);

  // criamos os listeners do canal
  const bcChannel: Predicate<Action<any>> = yield call(createChannel, channel);

  // criamos o processo que vai enviar as mensagens para o canal
  yield fork(broadcastMessageSender, channel);

  // Executamos indefinidamente
  while (true) {
    // Usamos o effect take para ler os eventos do channel
    const action: Action = yield take(bcChannel);

    // Enviamos uma ação para nossa store do redux
    yield put(action);
  }
}

export function* initalStatus() {
  const status = localStorage.getItem(PRESENCE_STATUS_KEY) || UserStatus.OFFLINE;
  yield put(setStatus(status))
}

export default all([
  takeLatest(ActionsType.PRESENCE_STATUS_CONNECT, broadcastManager),
  takeLatest(ActionsType.PRESENCE_STATUS_CONNECT, initalStatus),
]);
