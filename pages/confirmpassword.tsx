import React from "react";
import Layout from "../components/Layout";
import { NextPage } from "next";
import { useStore, useSelector } from "react-redux";

import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import withNotAuthenticated from "../hoc/withNotAuthenticated";
import { AppState } from "../store/types";
import { confirmPassword } from "../store/auth/actions";
import ConfirmPasswordForm from "../components/forms/ConfirmPasswordForm";
import { redirect } from "../utils";
import { useStyles } from "../utils/consts";



const ConfirmPassword: NextPage<any> = ({ username }) => {
  const store = useStore();
  const isLoading = useSelector<AppState, boolean>(
    state => state.authModule.loading
  );
  const onConfirmSubmit = async (data: any, e: any) => {
    store.dispatch(confirmPassword({ confirmationCode: data.confirmationCode, password: data.password,  email: username }));
  };

  const classes = useStyles();

  return (
    <Layout title="Register">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <CreateOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Confirm Change Password
          </Typography>
          <ConfirmPasswordForm
            onSubmitFunc={onConfirmSubmit}
            disabled={isLoading}
          ></ConfirmPasswordForm>
        </div>
      </Container>
    </Layout>
  );
};

ConfirmPassword.getInitialProps = ctx => {
  const { username } = ctx.query;
  if (!username) {
    redirect("/register", ctx);
  }
  return { username };
};

export default withNotAuthenticated(ConfirmPassword);
