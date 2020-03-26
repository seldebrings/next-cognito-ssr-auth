import React from "react";
import Layout from "../components/Layout";
import { NextPage } from "next";
import { useDispatch, useStore, useSelector } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import withNotAuthenticated from "../hoc/withNotAuthenticated";
import { AppState } from "../store/types";
import { register } from "../store/auth/actions";
import SignUpForm from "../components/forms/RegisterForm";
import { useRouter } from "next/router";
import InternalLink from "../components/InternalLink";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  }
}));

const Register: NextPage<any> = () => {
  const store = useStore();
  const router = useRouter();
  const isLoading = useSelector<AppState, boolean>(
    state => state.authModule.loading
  );

  const onSignUpSubmit = async (data: any, e: any) => {
    store.dispatch(register({ email: data.email, password: data.password }));
  };

  const classes = useStyles();

  return (
    <Layout title="Register">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PersonAddOutlinedIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <SignUpForm
            onSubmitFunc={onSignUpSubmit}
            disabled={isLoading}
          ></SignUpForm>
          <Grid container>
            <Grid item>
              <InternalLink href="/sign-in">
                Already have an account? Sign In
              </InternalLink>
            </Grid>
          </Grid>
        </div>
      </Container>
    </Layout>
  );
};
export default withNotAuthenticated(Register);
