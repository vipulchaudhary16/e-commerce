import { compose, createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { rootReducer } from './root-reducer'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import { encryptTransform } from 'redux-persist-transform-encrypt';
import thunk from 'redux-thunk'

const middlewares = [thunk]

if(process.env.NODE_ENV !== 'production') middlewares.push(logger)
const composeEnhancer =
  (process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const persistConfig = {
    key: 'root',
    storage,
    // blacklist: ['user'],
    whitelist : ['cart'],
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

const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares))
/**
 * 1st args: root reducer
 * 2nd args : any aditional default states
 * 3rd args: enhancers.. can be middleware etc
 */
export const store = createStore(persistedReducer, undefined, composedEnhancers)

export const persistor = persistStore(store)