import {
  legacy_createStore as createStoreRedux,
  applyMiddleware,
  StoreEnhancer,
  Reducer,
  Middleware,
  EmptyObject,
} from 'redux';
import { ApplicationState } from './modules/types';

export const createStore = (
  reducers: Reducer<EmptyObject & ApplicationState>,
  middlewares: Middleware[]
) => {
  const enhancer = applyMiddleware(...middlewares);

  return createStoreRedux(reducers, enhancer as StoreEnhancer);
};
