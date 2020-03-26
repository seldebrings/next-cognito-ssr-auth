import {
    AuthenticationDetails,
    CognitoUserPool,
    CognitoUserAttribute,
    CognitoUser,
    CognitoUserSession,
} from "amazon-cognito-identity-js";
import { NextApiRequest, NextApiResponse } from 'next';
import { getUserPool } from '../../utils/auth'


const confirmPassword = async (req: NextApiRequest, res:NextApiResponse) => {

    //username, verificationCode, newPassword
    const cognitoUser = new CognitoUser({
        Username: req.body.email,
        Pool: getUserPool()
    });

    return new Promise((resolve, reject) => {
        cognitoUser.confirmPassword(req.body.confirmationCode, req.body.password, {
            onSuccess:() => {
                resolve(res.status(200).json({user: cognitoUser.getUsername()}));
            },
            onFailure:(err) => {
                reject(res.status(400).json({ error: err.message }));
            }
        });
    });
}

export default confirmPassword