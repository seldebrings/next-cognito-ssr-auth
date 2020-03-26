
import { NextPageContext } from 'next';
import { NextApiResponse } from 'next';
export interface ReduxPageContext extends NextPageContext {
  reduxStore?: any;
}

export interface AuthFormProps {
  onSubmitFunc: any;
  disabled: boolean;
}


export type UserAuth = {
    jwt: string;
    jwt_expired: Date | 0;
    email: string;
    authenticated: boolean;
    refresh_token?: string;
    refresh_token_expired?: Date | 0;

  };

  export type CognitoUser = {
    email: string,
    password: string
  }

  export type RootState = {
    auth: UserAuth
  }

  export interface NextApiCookieResponse extends NextApiResponse {
    cookie?: any;
  }

/*   export type NameState = {
    name: string;
    nameSet: boolean
  } */