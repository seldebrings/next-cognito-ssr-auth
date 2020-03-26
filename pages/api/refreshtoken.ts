import { UserAuth, NextApiCookieResponse } from '../../utils/types'
import cookiepars from 'cookieparser'

import {
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  CognitoUserSession,
  CognitoRefreshToken
} from "amazon-cognito-identity-js"
import { NextApiRequest, NextApiResponse } from 'next'
import cookies from '../../utils/cookies'
import { getUserPool } from '../../utils/auth'


const refreshToken = async (req: NextApiRequest, res:NextApiCookieResponse) => {
  
  console.log('req.headers.cookie '+req.headers.cookie)
  
  if (req.headers.cookie) {
    const parsed = cookiepars.parse(req.headers.cookie)
    const refreshToken = new CognitoRefreshToken({ RefreshToken: parsed.token })
    const cognitoUser = new CognitoUser({
      Username: '',
      Pool: getUserPool()
    })
    return new Promise((resolve, reject) => {
    cognitoUser.refreshSession(refreshToken, (err, result) => {
      if (err) {
        reject(res.status(401).json({ error: 'The Access Token expired' }))
      } else {
        const expirationTime = new Date(result.getAccessToken().payload.exp * 1000)
        const auth: UserAuth = {
          jwt: result.getIdToken().getJwtToken(),
          jwt_expired: expirationTime,
          email: result.getIdToken().payload.email,
          authenticated: true,
          refresh_token: result.getRefreshToken().getToken(),
          refresh_token_expired: new Date(result.getIdToken().payload.auth_time * 1000 + 1000 * 60 * 60 * 24 * 30)
        }
        res.cookie('token', result.getRefreshToken().getToken(),{path: '/',
          expires: new Date(result.getAccessToken().payload.auth_time * 1000 + 1000 * 60 * 60 * 24 * 30),
          httpOnly: true
        })
        resolve(res.status(200).json(auth))

      }
    })

  })
  } else {
    res.status(401).json({ error: 'Missing auth cookie' })
  }
}

export default cookies(refreshToken)