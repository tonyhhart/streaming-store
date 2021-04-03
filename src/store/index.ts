import * as storage from 'redux-storage'
import createEngine from 'redux-storage-engine-localstorage';
import thunk from 'redux-thunk';

import { applyMiddleware, combineReducers, createStore } from '@reduxjs/toolkit';
import authReducer, { AuthState } from './authReducer';

const reducer = storage.reducer(combineReducers({
  auth: authReducer,
}));

const engine = createEngine('streaming-store');

const middleware = storage.createMiddleware(engine);

const createStoreWithMiddleware = applyMiddleware(middleware, thunk)(createStore);

const store = createStoreWithMiddleware(reducer);

const load = storage.createLoader(engine);

load(store);

export default store;

export type StoreState = {
  auth: AuthState
}

export type StoreDispatch = typeof store.dispatch

export * from './authReducer';
