import React, { useEffect } from "react"
import { NextPage } from "next"
import Router from "next/router"
import { ReduxPageContext } from "../utils/types"
import { refreshToken } from "../store/auth/actions"
import { withRedux } from "./withRedux"
import { redirect } from "../utils"

export default (WrappedPage: NextPage<any>) => {
  const WithAuthenticated: NextPage<any> = props => {
    return <WrappedPage {...props} />
  }

  WithAuthenticated.getInitialProps = async (ctx: ReduxPageContext) => {
    const isClient = !ctx.req
    const { dispatch } = ctx.reduxStore
    const { authenticated, jwt_expired } = ctx.reduxStore.getState().authModule
    //Check if were on server or client
    if (!isClient && ctx.req.headers.cookie) {
      // were the server, try and refresh token
      await dispatch(refreshToken(ctx))
    } else if (authenticated) {
      // were the client

      // if token expired, try and refresh token
      if (new Date(Date.now()) > new Date(jwt_expired)) {
        await dispatch(refreshToken(ctx))
      }
    } else {
      redirect("/sign-in", ctx)
    }

    const componentProps =
      WrappedPage.getInitialProps && (await WrappedPage.getInitialProps(ctx))

    return { ...componentProps }
  }

  return withRedux(WithAuthenticated)
}
