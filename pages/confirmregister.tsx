import React from "react";
import Layout from "../components/Layout";
import { NextPage } from "next";
import { useStore, useSelector } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import withNotAuthenticated from "../hoc/withNotAuthenticated";
import { AppState } from "../store/types";
import { confirmRegister } from "../store/auth/actions";
import ConfirmRegisterForm from "../components/forms/ConfirmRegisterForm";
import { redirect } from "../utils";
import { useStyles } from "../utils/consts";



const Confirm: NextPage<any> = ({ username }) => {
  const store = useStore();
  const isLoading = useSelector<AppState, boolean>(
    state => state.authModule.loading
  );

  const onConfirmSubmit = async (data: any, e: any) => {
    store.dispatch(confirmRegister({ ...data, email: username }));
  };

  const classes = useStyles();

  return (
    <Layout title="Register">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Confirm Registration {username}
          </Typography>
          <ConfirmRegisterForm
            onSubmitFunc={onConfirmSubmit}
            disabled={isLoading}
          ></ConfirmRegisterForm>
        </div>
      </Container>
    </Layout>
  );
};

Confirm.getInitialProps = ctx => {
  const { username } = ctx.query;
  if (!username) {
    redirect("/register", ctx);
  }
  return { username };
};
export default withNotAuthenticated(Confirm);
