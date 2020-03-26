import cookies from '../../utils/cookies'
import { NextApiRequest } from 'next'
import {
    AuthenticationDetails,
    CognitoUser
} from "amazon-cognito-identity-js"
import { UserAuth, NextApiCookieResponse } from '../../utils/types'
import { getUserPool } from '../../utils/auth'


const login = async ( req: NextApiRequest, res: NextApiCookieResponse ) => {

    const authenticationDetails = new AuthenticationDetails({
        Username: req.body.email,
        Password: req.body.password,
    })

    const cognitoUser = new CognitoUser({
        Username: req.body.email,
        Pool: getUserPool()
    })

    return new Promise((resolve, reject) => {

        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                const expirationTime = new Date(result.getAccessToken().payload.exp * 1000)
                const auth: UserAuth = {
                    jwt: result.getAccessToken().getJwtToken(),
                    jwt_expired: expirationTime,
                    email: req.body.email,
                    authenticated: true
                }
                res.cookie('token', result.getRefreshToken().getToken(), {
                    path: '/',
                    expires: new Date(result.getAccessToken().payload.auth_time * 1000 + 1000 * 60 * 60 * 24 * 30),
                    httpOnly: true
                })
                resolve(res.status(200).json(auth))
            },
            onFailure: function (err: any) {

                if (err) {
                    if (err.code === "NotAuthorizedException") {
                        reject(res.status(401).json({ error: err.message }))
                    } else {
                        reject(res.status(500).json({ error: "Server Error" }))
                    }
                }
            },
        })
    })
}

export default cookies(login)
//export default login