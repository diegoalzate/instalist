import { Fragment } from 'react'
import LoginForm from '../components/LoginForm'

export interface IState {
  signInWithDiscord: () => void
  signInWithOneTimeLink: (email: string) => void
  loading: Boolean
}

const Login = ({ signInWithDiscord, signInWithOneTimeLink, loading }: IState) => {
  return (
    <Fragment>
      <LoginForm
        loading={loading}
        signInWithDiscord={signInWithDiscord}
        signInWithOneTimeLink={signInWithOneTimeLink} 
      />
    </Fragment>
  )
}

export default Login