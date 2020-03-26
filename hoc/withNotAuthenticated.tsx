import React, { useEffect } from "react"
import { NextPage } from "next"
import Router from "next/router"
import { ReduxPageContext } from "../utils/types"
import { refreshToken } from "../store/auth/actions"
import { withRedux } from "./withRedux"
import { redirect } from "../utils"
import nextCookie from 'next-cookies'

export default (WrappedPage: NextPage<any>) => {
  const WithNotAuthenticated: NextPage<any> = props => {
    return <WrappedPage {...props} />
  }

  WithNotAuthenticated.getInitialProps = async (ctx: ReduxPageContext) => {
    
    const { token } = nextCookie(ctx)
    const isClient = !ctx.req
    const { dispatch } = ctx.reduxStore
    const { authenticated, jwt_expired } = ctx.reduxStore.getState().authModule
    //Check if were on server or client
    if (!isClient && token) {
      // were the server, try and refresh token
      await dispatch(refreshToken(ctx))
    } else if (authenticated) {
      redirect("/token", ctx)
    } else {
      if (token && new Date(Date.now()) > new Date(jwt_expired)) {
        await dispatch(refreshToken(ctx))
      }
    }

    const componentProps =
      WrappedPage.getInitialProps && (await WrappedPage.getInitialProps(ctx))

    return { ...componentProps }
  }

  return withRedux(WithNotAuthenticated)
}
