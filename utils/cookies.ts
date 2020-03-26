import { serialize } from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next';
import { NextApiCookieResponse } from './types';


/**
 * This sets `cookie` on `res` object
 */
const cookie : any = (res: any, name: string, value: any, options:any = {}) => {
  const stringValue: string =
    typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value)

  if ('maxAge' in options) {
    options.expires = new Date(Date.now() + options.maxAge)
    options.maxAge /= 1000
  }
  res.setHeader("Access-Control-Allow-Origin", "127.0.0.3");
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Set-Cookie', serialize(name, String(stringValue), options))
}

/**
 * Adds `cookie` function on `res.cookie` to set cookies for response
 */
const cookies = handler => (req: NextApiRequest, res:NextApiCookieResponse) => {
  res.cookie = (name, value, options) => cookie(res, name, value, options)

  return handler(req, res)
}

export default cookies
