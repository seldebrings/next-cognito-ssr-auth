import fetch from 'isomorphic-unfetch'
import cookies from '../../utils/cookies'
import cookiepars from 'cookieparser'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import {
    AuthenticationDetails,
    CognitoUserPool,
    CognitoUserAttribute,
    CognitoUser,
    CognitoUserSession,
} from "amazon-cognito-identity-js"
import { UserAuth } from '../../utils/types'
import { getUserPool } from '../../utils/auth'
import { NextApiRequest, NextApiResponse } from 'next'





const register = async (req: NextApiRequest, res: NextApiResponse) => {

    const attributeList = [
        new CognitoUserAttribute({Name: "email", Value: req.body.email}),
       //uncomment the below line when your userpool is configured with creating a new custom attribute
       // https://stackoverflow.com/questions/53475478/react-cognito-user-pool-a-client-attempted-to-write-unauthorized-attribute
       // https://stackoverflow.com/questions/44013901/amazon-cognito-a-client-attempted-to-write-unauthorized-attribute
       // new CognitoUserAttribute({Name: "custom:timestamp", Value: Date.now().toString()})
    ]

      return new Promise((resolve, reject) => {

      getUserPool().signUp(req.body.email, req.body.password, attributeList, null, function(err, result){
        if (err) {
          try {
            err.message = err.message
            resolve(res.status(400).json({error: err}))
          } catch (err) {
            reject(res.status(500))
          }
        }else{
          const cognitoUser:CognitoUser = result.user
          resolve(res.json({user: cognitoUser.getUsername()}))
        }
     
    })
})

} 


export default register
