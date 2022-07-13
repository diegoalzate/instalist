import { useQuery } from 'react-query'
import { supabase } from '../client'
import { useAuth } from '../context/AuthContext'
import { Profile } from '../types'

export const useProfile = () => {
  const { session } = useAuth()

  return useQuery(
    'Profile',
    async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select()
        .eq('id', session?.user?.id)

      if (error) return

      return data?.[0] as Profile
    },
    {
      enabled: !!session?.user?.id,
    }
  )

  
}
