import React from "react"
import Layout from "../components/Layout"
import { NextPage } from "next";
import { useStore, useSelector } from 'react-redux';
import Avatar from '@material-ui/core/Avatar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import withNotAuthenticated from "../hoc/withNotAuthenticated"
import SignInForm from "../components/forms/SignInForm"
import { AppState } from "../store/types"
import { signIn } from "../store/auth/actions"
import Grid from "@material-ui/core/Grid"
import InternalLink from "../components/InternalLink"
import { useStyles } from "../utils/consts";




const Material: NextPage<any> = () => { 

  const store = useStore()
  const isLoading = useSelector<AppState, boolean>(state => state.authModule.loading);

  const onSignInSubmit =  async (data: any, e: any) => {
    store.dispatch(signIn(data))
  }

  
  const classes = useStyles();

  return (
    <Layout title="Sign">
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <SignInForm onSubmitFunc={onSignInSubmit} disabled={isLoading}></SignInForm>
        <Grid container>
          <Grid item xs>
            <InternalLink href="/forgotpassword">Forgot password?</InternalLink>
          </Grid>
          <Grid item>
            <InternalLink href="/register">
              Don't have an account? Sign Up
            </InternalLink>
          </Grid>
        </Grid>
      </div>
    </Container>
    </Layout>
  );
};
export default withNotAuthenticated(Material);