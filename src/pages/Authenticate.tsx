import { useState, lazy } from "react"

const Login = lazy(() => import("./Login"))
//const SignUp = lazy(() => import("./SignUp"))

const Authenticate = () => {
  const [register, setRegister] = useState(false)
  const [authLoading, setAuthLoading] = useState(false)
  const [confirm, setConfirm] = useState<boolean>(false)
  const [success, setSuccess] = useState(false)
  const [localError, setLocalError] = useState<any>()

  const toggleRegister = () => {
    setRegister(!register)
  }

  const handleSignIn = async (phone: string, password: string) => {
    console.log(phone, password)
  }

  //const handleSignUp

  //const handleConfirm

  return (
    <>
      {!register && !confirm && (
        <Login
          signInHandler={handleSignIn}
          loading={authLoading}
          error={localError}
          toggleRegister={toggleRegister}
          success={success}
        />
      )}
    </>
  )
}

export default Authenticate