import React, { useState, useEffect } from "react"
import Head from "next/head"
import { useSelector } from "react-redux"
import Nav from "./Nav"
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import Button from '@material-ui/core/Button'
import { AppState } from "../store/types"


interface LayoutProps {
  title: string
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}


const Layout: React.FC<LayoutProps> = ({ title, children }) => {
  

  const error:string = useSelector<AppState, string>(
    state => state.authModule.error
  )
  const message:string = useSelector<AppState, string>(
    state => state.authModule.message
  )

  useEffect(() => {
    if(error){
      setShowError(true)
    }
    if(message){
      setShowMessage(true)
    }
  }, [error, message])
  
  const [ showError, setShowError ] = useState(false)
  const [ showMessage, setShowMessage ] = useState(false)
  const handleErrorClose = (e) => {
    setShowError(false)
  }
  const handleMessageClose = (e) => {
    setShowMessage(false)
  }


  return (
    <>
      <Head>
        <title>NextJS Cognito Example - {title}</title>
        <meta name="title" content="NextJS Cognito Example"></meta>
        <meta
          httpEquiv="Content-Type"
          content="text/html charset=utf-8"
        ></meta>
        <meta name="revisit-after" content="10 days"></meta>
        <link
          rel="shortcut icon"
          href="../favicon.ico"
          type="image/x-icon"
        ></link>
      </Head>
      <Nav></Nav>
      {children}
      <Snackbar open={showError} autoHideDuration={6000} onClose={handleErrorClose}>
        <Alert onClose={handleErrorClose} severity="error">
          {error}
        </Alert>
      </Snackbar>
      <Snackbar open={showMessage} autoHideDuration={6000} onClose={handleMessageClose}>
        <Alert onClose={handleMessageClose} severity="info">
          {message}
        </Alert>
      </Snackbar>
   
    </>
  )
}

export default Layout
