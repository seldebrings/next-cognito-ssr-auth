
import React, { useEffect } from 'react'
import { NextPage } from 'next'
import Router from 'next/router'


export default (WrappedPage: NextPage<any>) => {
/*    */

  
  const WithAuthSync: NextPage<any> = (props) => {


    const syncLogout = event => {
      if (event.key === 'logout') {
       // console.log('logged out from storage!')
        window.localStorage.clear()
        Router.push('/sign-in')
      }
    }

    useEffect(() => {
      //console.log('useEffect props '+JSON.stringify(props))
      window.addEventListener('storage', syncLogout)
      return () => {
        window.removeEventListener('storage', syncLogout)
        window.localStorage.removeItem('logout')
      }
    }, [])

  return (

      <WrappedPage {...props} />
  
  )
}

WithAuthSync.getInitialProps = async (ctx) => {
  //console.log('With Auth Sync Token Component Props')

  const token: string = ""


  const componentProps = WrappedPage.getInitialProps &&
  (await WrappedPage.getInitialProps(ctx))
  return {token, ...componentProps }
}

return WithAuthSync

}