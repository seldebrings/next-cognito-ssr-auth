import {
    AuthenticationDetails,
    CognitoUserPool,
    CognitoUserAttribute,
    CognitoUser,
    CognitoUserSession,
} from "amazon-cognito-identity-js";


export const getUserPool = (): CognitoUserPool => {

    const userPool: CognitoUserPool = new CognitoUserPool({
        UserPoolId: process.env.USER_POOL_ID,
        ClientId: process.env.CLIENT_ID 
    });

    return userPool;

}


export const getCognitoUser = (): CognitoUser => {

    return getUserPool().getCurrentUser();
}