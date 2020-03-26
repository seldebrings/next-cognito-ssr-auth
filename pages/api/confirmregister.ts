import {
  CognitoUser
} from "amazon-cognito-identity-js"
import { NextApiRequest, NextApiResponse } from 'next'
import { getUserPool } from '../../utils/auth'


const ConfirmRegister = async (req: NextApiRequest, res: NextApiResponse) => {

  return new Promise((resolve, reject) => {
    const cognitoUser = new CognitoUser({
      Username: req.body.email,
      Pool: getUserPool()
    })

    cognitoUser.confirmRegistration(req.body.confirmationCode, true, function (err, result) {

      if (err) {
        try {
          err.message = err.message
          resolve(res.status(400).json({ error: err }))
        } catch (err) {
          reject(res.status(500))
        }
      } else {
        resolve(res.json({ registered: true }))
      }
    })
  })
}


export default ConfirmRegister