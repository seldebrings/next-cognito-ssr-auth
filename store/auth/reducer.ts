import { AUTH_INITIAL_STATE, INITIAL_CREDENTIALS } from './consts';
import { AuthState, AuthActionTypes, SET_AUTH, CLEAR_AUTH, SET_CREDENTIALS, CLEAR_CREDENTIALS, SET_ERROR, SET_LOADING, SET_MESSAGE } from "./types"
import { Action, Reducer } from "redux"


export const authReducer: Reducer<AuthState, Action> = (state: AuthState = AUTH_INITIAL_STATE, action: AuthActionTypes): AuthState => {
  switch (action.type) {
    case SET_AUTH:
      return Object.assign({}, state, action.payload, {
        credentials: INITIAL_CREDENTIALS
      })
    case CLEAR_AUTH:
      return Object.assign({}, AUTH_INITIAL_STATE)
    case SET_CREDENTIALS:
      return Object.assign({}, state, {
        credentials: action.payload
      })
    case CLEAR_CREDENTIALS:
      return Object.assign({}, state, {
        credentials: INITIAL_CREDENTIALS
      })
    case SET_LOADING:
      return Object.assign({}, state, {
        loading: action.payload
      })
    case SET_ERROR:
      return Object.assign({}, state, {
        error: action.payload
      })
    case SET_MESSAGE:
      return Object.assign({}, state, {
        message: action.payload
      })
    default:
      return state
  }
}