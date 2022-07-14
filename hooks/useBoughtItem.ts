import { useMutation } from 'react-query'
import { queryClient } from '../pages/_app'
import { supabase } from '../client'
import { Item } from '../types'
import { useProfile } from './useProfile'

export const useBoughtItem = () => {
  const { data: profile } = useProfile()

  return useMutation(
    async ({item}: {item: Item}) => {
      const { data } = await supabase
        .from('items')
        .update({ bought: !item.bought })
        .match({ id: item.id })
      if (profile) {
        const { error: errorProfile } = await supabase
          .from('items')
          .update({ bought_by: profile.id })
          .match({ id: item.id })
        if (errorProfile) {
            throw new Error('Could not update bought_by in item')
        }
      }
      return data as Item[]
    },
    {
      onSuccess: async (res) => {
        await queryClient.invalidateQueries(['Items', res?.[0]?.list_id])
      },
    }
  )
}
