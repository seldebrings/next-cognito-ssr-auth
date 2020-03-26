import React from "react";
import Layout from "../components/Layout";
import { NextPage } from "next";
import { useStore, useSelector } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import withNotAuthenticated from "../hoc/withNotAuthenticated";
import EmailForm from "../components/forms/EmailForm";
import { AppState } from "../store/types";
import { resetPassword } from "../store/auth/actions";
import { useStyles } from "../utils/consts";



const ForgotPassword: NextPage<any> = () => {
  const store = useStore();
  const isLoading = useSelector<AppState, boolean>(
    state => state.authModule.loading
  );

  const onSignInSubmit = async (data: any, e: any) => {
    store.dispatch(resetPassword(data));
  };
  const classes = useStyles();

  return (
    <Layout title="Sign">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <HelpOutlineIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Forgot Password?
          </Typography>
          <EmailForm
            label="Reset Password"
            onSubmitFunc={onSignInSubmit}
            disabled={isLoading}
          ></EmailForm>
        </div>
      </Container>
    </Layout>
  );
};
export default withNotAuthenticated(ForgotPassword);
