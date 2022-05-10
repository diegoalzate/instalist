import { Fragment } from 'react'
import LoginForm from '../components/LoginForm'

export interface IState {
  loading: boolean
  error: any
  success?: boolean
  toggleRegister: () => void
  signInHandler: (email: string, password: string) => void
  signInWithDiscord: () => void
}

const Login = ({ signInWithDiscord, signInHandler, toggleRegister, error, loading, success }: IState) => {
  return (
    <Fragment>
      <LoginForm
        error={error}
        signInHandler={signInHandler}
        signInWithDiscord={signInWithDiscord}
        toggleRegister={toggleRegister}
        loading={loading}
        success={success} 
      />
    </Fragment>
  )
}

export default Login