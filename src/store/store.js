import { compose, createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { rootReducer } from './root-reducer'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import { encryptTransform } from 'redux-persist-transform-encrypt';
import createSagaMiddleware from "redux-saga"
import { rootSaga } from './root-saga'

const middlewares = []

if(process.env.NODE_ENV !== 'production') middlewares.push(logger)
const composeEnhancer =
  (process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const sagaMiddleware = createSagaMiddleware()
middlewares.push(sagaMiddleware)

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user'],
    transforms: [
        encryptTransform({
          secretKey: 'secret-key',
          onError(error) {
            console.log(error)
          },
        }),
      ],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares))
/**
 * 1st args: root reducer
 * 2nd args : any aditional default states
 * 3rd args: enhancers.. can be middleware etc
 */
export const store = createStore(persistedReducer, undefined, composedEnhancers)

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)