import {
    AuthenticationDetails,
    CognitoUserPool,
    CognitoUserAttribute,
    CognitoUser,
    CognitoUserSession,
} from "amazon-cognito-identity-js"
import { UserAuth } from '../../utils/types'
import { NextApiRequest, NextApiResponse } from 'next'
import { getUserPool } from '../../utils/auth'

const resetPassword = async (req: NextApiRequest, res: NextApiResponse) => {


    const cognitoUser = new CognitoUser({
        Username: req.body.email,
        Pool: getUserPool()
    })



    return new Promise((resolve, reject) => {
        cognitoUser.forgotPassword({
            onSuccess: function (result) {
                
                resolve(res.status(200).json({ user: cognitoUser.getUsername() }))

            },
            onFailure: function (err) {
               
                reject(res.status(401).json(err))

            }

        })
    })
}


export default resetPassword