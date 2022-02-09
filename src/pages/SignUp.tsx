import { Fragment } from 'react'
import SignUpForm from '../components/SignUpForm'

export type IRegistration = (
  phone: string,
  password: string
) => void

interface IState {
  loading: boolean
  error: any
  toggleRegister?: () => void
  signUpHandler: IRegistration
}

const SignUp = ({ signUpHandler, toggleRegister, error, loading }: IState) => {
  return (
    <Fragment>
      <SignUpForm
        error={error}
        toggleRegister={toggleRegister}
        signUpHandler={signUpHandler}
        loading={loading}
      />
    </Fragment>
  )
}

export default SignUp