import { useQuery } from 'react-query'
import { supabase } from '../client'
import { useUser } from '@supabase/auth-helpers-react';
import { Profile } from '../types'

export const useProfile = () => {
  const {user} = useUser();
  return useQuery(
    ['Profile', user?.email],
    async () => {
      if (!user) return null
      const { data, error } = await supabase
        .from('profiles')
        .select()
        .eq('id', user?.id)
      if (error) return null
      return data?.[0] as Profile
    }
  )

  
}
