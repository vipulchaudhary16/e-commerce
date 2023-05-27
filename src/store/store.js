import { compose, createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { rootReducer } from './root-reducer'

const loggerMiddleware = (store) => (next) => (action) => {
    if (!action.type) {
        return next(action)
    }
    console.log('type: ' + action.type);
    console.log('payload: ' + action.payload)
    console.log('currState: ', store.getState())
    
    next(action)
    console.log('nextState: ', store.getState())
}

const middlewares = [logger]
const composedEnhancers = compose(applyMiddleware(...middlewares))
/**
 * 1st args: root reducer
 * 2nd args : any aditional default states
 * 3rd args: enhancers.. can be middleware etc
 */
export const store = createStore(rootReducer, undefined, composedEnhancers)