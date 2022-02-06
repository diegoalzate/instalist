import { Fragment } from 'react'
import LoginForm from '../components/LoginForm'

export interface IState {
  loading: boolean
  error: any
  success?: boolean
  toggleRegister: (register?: boolean) => void
  signInHandler: (email: string, password: string) => void
}

const Login = ({ signInHandler, toggleRegister, error, loading, success }: IState) => {
  return (
    <Fragment>
      <LoginForm
        error={error}
        signInHandler={signInHandler}
        toggleRegister={toggleRegister}
        loading={loading}
        success={success} 
      />
    </Fragment>
  )
}

export default Login