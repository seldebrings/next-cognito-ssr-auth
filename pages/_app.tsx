import React from "react"
import App, { AppContext } from "next/app"
import Page from "../components/Page"
import "../scss/custom.scss"
import "../scss/default.scss"


  class MyApp extends App {

  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  // static async getInitialProps(appContext) {
  //   // calls page's `getInitialProps` and fills `appProps.pageProps`
  //   const appProps = await App.getInitialProps(appContext)
  //
  //   return { ...appProps }
  // }
/*   static async getInitialProps({ Component, ctx }: AppContext) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}

    return { pageProps }
  } */

  render() {
   
    //const { Component, pageProps, store } = this.props
    const { Component, pageProps } = this.props
    return (
    <>
    
    <Page>
    <Component {...pageProps} />
    </Page>
  
    <style jsx global>{`
          #__next {
            height: 100%;
            margin: 0;
            padding: 0;
          }
        `}</style>
    </>
    )
  }
}


export default MyApp