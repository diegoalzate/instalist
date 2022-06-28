import { Session, User } from "@supabase/supabase-js";
import React, { useCallback, useContext, useEffect, useLayoutEffect, useState } from "react";
import { supabase } from "../client";

interface IAuthContext {
  isAuthenticated: boolean
  loading: boolean
  user: any
  error: any
  session: Session | null
  signOut: () => void
}

interface AuthProviderOptions {
  children: React.ReactElement
}

export const AuthContext = React.createContext<IAuthContext | null>(null)

export const useAuth = () => useContext(AuthContext)!

export const AuthProvider = ({ children }: AuthProviderOptions) => {
  const [loading, setLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null> (null)
  const [error, setError] = useState<any>(null)

  const refreshState = useCallback(async () => {
    setLoading(true)
    try {
      const session = await supabase.auth.session()
      setSession(session)
      setIsAuthenticated(handleIsAuthenticatedCheck(session))
      setError(null)
      setLoading(false)
    } catch (err) {
      setUser(null)
      setIsAuthenticated(false)
      if (err === 'not authenticated') {
        setError(null)
      } else {
        console.log(err)
        setError(err)
      }
      setLoading(false)
    }
  }, [])

  useLayoutEffect(() => {
    refreshState()
    return () => { }
  }, [refreshState])
  
  useEffect(() => {
    let isMounted = true
    // subscribe to authchanges
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') {
        if (isMounted) {
          refreshState()
        }
      } else if (event === 'SIGNED_OUT') {
        if (isMounted) {
          refreshState()
        }
      } else {
        setLoading(false)
        setError(event)
      }
    })

    return () => {
      isMounted = false
    }
  }, [refreshState])

  const signOut = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signOut()
    setLoading(false)
    if (error) return 
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loading,
        user,
        error,
        session,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const handleIsAuthenticatedCheck = (session: Session | null) => {
  if (
    !session ||
    !session.access_token || 
    !session.expires_at 
  ) {
    return false
  }

  const sessionExpiry = new Date(session.expires_at * 1000)
  const isExpired = new Date() > sessionExpiry
  return !isExpired
}

