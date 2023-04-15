import { compose, createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { rootReducer } from './root-reducer'

const middlewares = [logger]
const composedEnhancers = compose(applyMiddleware(...middlewares))
/**
 * 1st args: root reducer
 * 2nd args : any aditional default states
 * 3rd args: enhancers.. can be middleware etc
 */
export const store = createStore(rootReducer, undefined, composedEnhancers)