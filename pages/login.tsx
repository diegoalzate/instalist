import { Fragment, useState } from 'react'
import { supabase } from '../client'
import LoginForm from '../components/LoginForm'


const Login = () => {
  const [authLoading, setAuthLoading] = useState(false)
  const [success, setSuccess] = useState(false);
  const signInWithDiscord = async () => {
    setAuthLoading(true)
    try {
      if (typeof window !== "undefined") {
        const { user } = await supabase.auth.signIn(
          {
            provider: 'discord',
          },
          { redirectTo: typeof window !== "undefined" ? window.location.origin : '' }
        )
        setAuthLoading(false)
      }
    } catch (err) {
      setAuthLoading(false)
    }
  }

  const signInWithOneTimeLink = async (email: string) => {
    setAuthLoading(true)
    try {
      const { user } = await supabase.auth.signIn(
        {
          email,
        },
        {
          redirectTo: typeof window !== "undefined" ? window.location.origin : '',
        }
      )
      setSuccess(true)
      setAuthLoading(false)
    } catch (err) {
      setAuthLoading(false)
      setSuccess(false)
    }
  }
  return (
    <Fragment>
      <LoginForm
        success={success}
        loading={authLoading}
        signInWithDiscord={signInWithDiscord}
        signInWithOneTimeLink={signInWithOneTimeLink} 
      />
    </Fragment>
  )
}

export default Login