/*
import { compose, createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { rootReducer } from './root-reducer'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import { encryptTransform } from 'redux-persist-transform-encrypt';

import { configureStore } from "@reduxjs/toolkit";

const middleware = []
if(process.env.NODE_ENV === 'development') middleware.push(logger)
const composeEnhancer =
  (process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user'],
    transforms: [
        encryptTransform({
          secretKey: 'my-super-secret-key-xxxx',
          onError(error) {
            // Handle the error.
            console.log(error)
          },
        }),
      ],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const composedEnhancers = composeEnhancer(applyMiddleware(...middleware))
export const store = createStore(persistedReducer, undefined, composedEnhancers)
export const persistor = persistStore(store)
*/
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import { rootReducer } from './root-reducer';
import { configureStore } from '@reduxjs/toolkit';
const middleware = [];
if (process.env.NODE_ENV === 'development') middleware.push(logger);

const persistConfig = {
	key: 'root',
	storage,
	blacklist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}).concat(middleware),
});

export const persistor = persistStore(store);
