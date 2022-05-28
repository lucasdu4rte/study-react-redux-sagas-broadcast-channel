import { combineReducers, Reducer } from 'redux';

import { userReducers } from './user/reducers';
import { ApplicationState } from './types';

export const rootReducer: Reducer<ApplicationState> =
  combineReducers<ApplicationState>({
    user: userReducers,
  });
