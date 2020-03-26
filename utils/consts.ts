import { UserAuth } from './types';
import { makeStyles } from '@material-ui/core/styles'
/** Default user auth object */ 
export const DEFAULT_USER_AUTH: UserAuth = Object.freeze({
    jwt: '',
    jwt_expired: 0,
    email: '',
    authenticated: false
  });


  export const useStyles = makeStyles(theme => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    logo: {
      margin: theme.spacing(1),
      backgroundColor: '#ffffff',
    },
    avatar: {
      width: theme.spacing(7),
      height: theme.spacing(7),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1)
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    }
   
  }))