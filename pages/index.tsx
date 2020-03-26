import Layout from "../components/Layout"
import { withRedux } from "../hoc/withRedux"
import { Container, CssBaseline, Avatar, Typography } from "@material-ui/core"
import { useStyles } from "../utils/consts"
import { Icon, InlineIcon } from '@iconify/react'

function Index() {

  const classes = useStyles()

return (
  <Layout title="Home">
  <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
      <img src="/images/next_logo.svg" height="85"></img>
        <Typography align="center" component="h1" variant="h5">
          NextJS / SSR / AWS Cognito 
        </Typography>
        <Typography align="center" component="h3" variant="h3">
        HttpOnly Cookie base authentication boilerplate
        </Typography>
      </div>
    </Container>
    </Layout>
  )
}

export default withRedux(Index)