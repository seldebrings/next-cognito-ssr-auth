import * as React from "react"
/** Custom types */
/** Utils */
import { UserAuth } from "../utils/types"
import { DEFAULT_USER_AUTH } from "../utils/consts"
import cookie from "js-cookie"

const useAuthHandler = (initialState: UserAuth) => {
  const [auth, setAuth] = React.useState(initialState)
  const setAuthStatus = (userAuth: UserAuth) => {
    console.log("setAuthStatus")

    setAuth(userAuth)
  }

  const setUnauthStatus = () => {
    console.log("setUnauthStatus")
    window.localStorage.setItem("logout", Date.now().toString())
    cookie.remove("token")
    //window.localStorage.clear()
    setAuth(DEFAULT_USER_AUTH)
  }

  return {
    auth,
    setAuthStatus,
    setUnauthStatus
  }
}
export default useAuthHandler
