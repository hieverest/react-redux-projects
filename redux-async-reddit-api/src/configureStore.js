import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from './reducers'
import rootEpic from './epics'
import { createEpicMiddleware } from 'redux-observable'

const epicMiddleware = createEpicMiddleware(rootEpic);

const loggerMiddleware = createLogger()

export default function configureStore(preloadedState) {

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(rootReducer, preloadedState, composeEnhancers(
    applyMiddleware(
      epicMiddleware,
      thunkMiddleware,
      loggerMiddleware
    )));
}