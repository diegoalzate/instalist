import { useQuery } from 'react-query'
import { supabase } from '../../client'
import { useUser } from '@supabase/auth-helpers-react';
import { List } from '../../types'

export const useLists = () => {
  const { user } = useUser()

  return useQuery(
    'Lists',
    async () => {
      const { data, error } = await supabase
        .from('lists')
        .select()
        .eq('profile_id', user?.id)

      if (error) return

      return data as List[]
    },
    {
      enabled: !!user?.id,
    }
  )
}
