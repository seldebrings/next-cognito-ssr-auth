export const SET_AUTH = 'SET_AUTH'
export const CLEAR_AUTH = 'CLEAR_AUTH'
export const SET_CREDENTIALS = 'SET_CREDENTIALS'
export const CLEAR_CREDENTIALS = 'CLEAR_CREDENTIALS'
export const SET_ERROR = 'SET_ERROR'
export const SET_MESSAGE = 'SET_MESSAGE'
export const SET_LOADING = 'SET_LOADING'

export interface CognitoCredentials {
  email: string,
  password?: string,
  confirmationCode?: string
}

export interface AuthState {
    credentials: CognitoCredentials;
    loading: boolean;
    jwt: string;
    jwt_expired: Date | 0;
    email: string;
    authenticated: boolean;
    refresh_token?: string;
    refresh_token_expired?: Date | 0;
    error?: Error | string;
    registered?: boolean;
  }

  export interface SetCredentialsAction {
    type: typeof SET_CREDENTIALS
    payload: CognitoCredentials
  }

  export interface ClearCredentialsAction {
    type: typeof CLEAR_CREDENTIALS
  }

  export interface SetAuthAction {
    type: typeof SET_AUTH
    payload: AuthState
  }

  export interface ClearAuthAction {
    type: typeof CLEAR_AUTH
 
  }

  export interface SetErrorAction {
    type: typeof SET_ERROR,
    payload: string
 
  }

  export interface SetMessageAction {
    type: typeof SET_MESSAGE,
    payload: string
 
  }

  export interface SetLoadingAction {
    type: typeof SET_LOADING,
    payload: boolean
 
  }





  export type AuthActionTypes = SetAuthAction | ClearAuthAction | SetCredentialsAction | ClearCredentialsAction | SetErrorAction | SetMessageAction | SetLoadingAction