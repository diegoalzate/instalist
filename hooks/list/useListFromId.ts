import { useQuery } from 'react-query'
import { supabase } from '../../client'
import { List } from '../../types'

export const useListFromId = (id: string) => {
  return useQuery(
    ['List', id],
    async () => {
      const { data, error } = await supabase
        .from('lists')
        .select()
        .eq('id', id)

      if (error) return

      return data as List[]
    },
    {
        enabled: !!id
    }
  )
}
