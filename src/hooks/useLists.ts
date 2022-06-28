import { useQuery } from 'react-query'
import { supabase } from '../client'
import { useAuth } from '../context/AuthContext'
import { List } from '../types'

export const useLists = () => {
  const { session } = useAuth()

  return useQuery(
    'Lists',
    async () => {
      const { data, error } = await supabase
        .from('lists')
        .select()
        .eq('profile_id', session?.user?.id)

      if (error) return

      return data as List[]
    },
    {
      enabled: !!session?.user?.id,
    }
  )
}
