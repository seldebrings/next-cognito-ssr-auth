import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { AppState } from './types'
import { authReducer } from './auth/reducer'
import { AUTH_INITIAL_STATE } from './auth/consts'

export const appInitialState: AppState = {
  authModule: AUTH_INITIAL_STATE
}

const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}


export const rootReducer = combineReducers({
  authModule: authReducer
});

export const initializeStore = (preloadedState: AppState = appInitialState) => {

  return createStore(
    rootReducer
    ,
    preloadedState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
}