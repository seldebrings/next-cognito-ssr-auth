import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { AppState } from "../store/types"
import { useDispatch, useStore, useSelector } from "react-redux"
import { signOut } from "../store/auth/actions"
import AccountCircle from "@material-ui/icons/AccountCircle"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import Menu from "@material-ui/core/Menu"
import MenuIcon from "@material-ui/icons/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import InternalLink from "./InternalLink"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    cursor: 'pointer'
  }
}))

const Nav: React.FC = () => {
  const classes = useStyles()
  const router = useRouter()
  const isAuthenticated = useSelector<AppState, boolean>(
    state => state.authModule.authenticated
  )

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const dispatch = useDispatch()
  const onSignOutClick = (e: any) => {
    dispatch(signOut())
  }

  const goToUrlClick = (url: string, e: any) => {
    router.push(url)
  }

  return (
    <AppBar position="static">
      <Toolbar>
        
       
          <Typography onClick={e => goToUrlClick("/", e)} variant="h6" className={classes.title}>
            NextJS Cognito
          </Typography>
    

        <Button
          hidden={isAuthenticated}
          onClick={e => goToUrlClick("/sign-in", e)}
          color="inherit"
        >
          Sign In
        </Button>
        {isAuthenticated && (
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={e => goToUrlClick("/token", e)}>
                Token
              </MenuItem>
              <MenuItem onClick={onSignOutClick}>Sign out</MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Nav
