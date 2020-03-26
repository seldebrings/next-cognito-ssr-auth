import cookies from '../../utils/cookies'
import { NextApiRequest } from 'next'
import { NextApiCookieResponse } from '../../utils/types'



const logout = async (req: NextApiRequest, res:NextApiCookieResponse) => {

    res.cookie('token', '', {
        path: '/',
        expires: new Date(Date.now()),
        httpOnly: true
    })

    return res.status(200).json({ ok: true })

}


export default cookies(logout)