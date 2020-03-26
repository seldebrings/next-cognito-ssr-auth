
import { POST_REQUEST_INIT } from "./consts"
import { ReduxPageContext } from "../../utils/types"
import { NextApiRequest } from "next"
import { IncomingMessage } from "http"

export const isAuthenticated = (store: any): boolean => {


  return true

}

export const getRequestInit = (ctx: ReduxPageContext = undefined): any => {


    return ctx && ctx.req && ctx.req.headers.cookie
      ? {
        ...POST_REQUEST_INIT,
        ...{ headers: { cookie: ctx.req.headers.cookie } }
      }
      : POST_REQUEST_INIT


}

export const apiUrl = (path: string, ctx: ReduxPageContext = undefined): string => {

  if (!ctx && typeof window !== "undefined") return path
  const req:IncomingMessage = ctx.req;
  const host = req
    ? req.headers["x-forwarded-host"] || req.headers.host
    : window.location.host
  const proto = req
    ? req.headers["x-forwarded-proto"] || "http"
    : window.location.protocol.slice(0, -1)
  console.log('proto ' + proto + ' host ' + host)
  return `${proto}://${host}${path}`
}