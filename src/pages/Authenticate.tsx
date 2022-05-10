import { useState, lazy } from "react"
import { supabase } from "../client"
import { useHistory } from 'react-router-dom';

const Login = lazy(() => import("./Login"))
const SignUp = lazy(() => import("./SignUp"))
const ConfirmationPin = lazy(() => import("./ConfirmationPin"))

const Authenticate = () => {
  // temp
  const history = useHistory()

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

  const signInWithDiscord = async () => {
    setAuthLoading(true)
    try {
      const { user, session, error } = await supabase.auth.signIn({
        provider: 'discord',
      })
      console.log(user)
      setAuthLoading(false)
      setSuccess(true)
    } catch (err) {
      setAuthLoading(false)
      setSuccess(false)
      setLocalError(err)
    }
  }

  const handleSignUp = async (phone: string, password: string) => {
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

  const handleConfirm = async (token: string) => {
    setAuthLoading(true)
    console.log("token: ", token)
    if (!token || !phone) {
      setAuthLoading(false)
      setLocalError({
        message: "Error with code or with phone"
      })
      return
    }
    try {
      const response = await supabase.auth.verifyOTP({
        phone,
        token
      })
      if (response && response.session?.access_token) {
        setAuthLoading(false)
        setConfirm(false)
        setLocalError(undefined)


        //temp
        history.push('/')

      } else {
        setAuthLoading(false)
        setConfirm(true)
        setLocalError({ message: response })
      }
    } catch (err) {
      setAuthLoading(false)
      setSuccess(false)
      setLocalError(err)
    }
  }

  return (
    <>
      {!register && !confirm && (
        <Login
          signInHandler={handleSignIn}
          loading={authLoading}
          error={localError}
          toggleRegister={toggleRegister}
          success={success}
          signInWithDiscord={signInWithDiscord}
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
      {!register && confirm && (
        <ConfirmationPin
          handleConfirm={handleConfirm}
          loading={authLoading}
          error={localError}
          phone={phone}
         />
      )}
    </>
  )
}

export default Authenticate