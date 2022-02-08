import { useState, lazy } from "react"
import { supabase } from "../client"
import SignUp from "./SignUp"

const Login = lazy(() => import("./Login"))
//const SignUp = lazy(() => import("./SignUp"))

const Authenticate = () => {
  const [register, setRegister] = useState(false)
  const [authLoading, setAuthLoading] = useState(false)
  const [confirm, setConfirm] = useState<boolean>(false)
  const [success, setSuccess] = useState(false)
  const [localError, setLocalError] = useState<any>()
  const [phone, setPhone] = useState<string | undefined>()


  const toggleRegister = () => {
    setRegister(!register)
  }

  const handleSignIn = async (phone: string, password: string) => {
    console.log(phone, password)
    setAuthLoading(true)
    try {
      const response = await supabase.auth.signIn({
        phone,
        password
      })
      console.log(response)
      setAuthLoading(false)
      setSuccess(true)
    } catch (err) {
      setAuthLoading(false)
      setSuccess(false)
      setLocalError(err)
    }
  }

  const handleSignUp = async (phone: string, password: string) => {
    console.log(phone, password)
    setAuthLoading(true)
    try {
      const response = await supabase.auth.signUp({
        phone,
        password
      })
      console.log(response)
      if (!response.error) {
        setConfirm(true)
        setRegister(false)
        setPhone(phone)
        setAuthLoading(false)
      }
    } catch (err) {
      setAuthLoading(false)
      setSuccess(false)
      setLocalError(err)
    }
  }

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
      {register && !confirm && (
        <SignUp 
          signUpHandler={handleSignUp}
          loading={authLoading}
          error={localError}
          toggleRegister={toggleRegister}    
        />
      )}
    </>
  )
}

export default Authenticate