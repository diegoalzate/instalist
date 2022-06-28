import { lazy, useState } from 'react'
import { supabase } from '../client'

const Login = lazy(() => import('./Login'))
const Authenticate = () => {
  // temp
  const [authLoading, setAuthLoading] = useState(false)

  const signInWithDiscord = async () => {
    setAuthLoading(true)
    try {
      const { user, session, error } = await supabase.auth.signIn(
        {
          provider: 'discord',
        },
        { redirectTo: window.location.origin }
      )
      console.log(user)
      setAuthLoading(false)
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
          redirectTo: window.location.origin,
        }
      )
      console.log(user)
      setAuthLoading(false)
    } catch (err) {
      setAuthLoading(false)
    }
  }

  return (
    <>
      <Login
        loading={authLoading}
        signInWithOneTimeLink={signInWithOneTimeLink}
        signInWithDiscord={signInWithDiscord}
      />
    </>
  )
}

export default Authenticate
