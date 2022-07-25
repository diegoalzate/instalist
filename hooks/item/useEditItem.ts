import { useMutation } from 'react-query'
import { queryClient } from '../../pages/_app'
import { supabase } from '../../client'
import { Item } from '../../types'
import { useProfile } from '../useProfile'

export const useEditItem = () => {
  return useMutation(
    async ({item}: {item: Item}) => {
      delete item.updated_at
      delete item.created_at
      const { data } = await supabase
        .from('items')
        .update({ ...item  } as Item)
        .match({ id: item.id })
      return data as Item[]
    },
    {
      onSuccess: async (res) => {
        await queryClient.invalidateQueries(['Items', res?.[0]?.list_id])
      },
    }
  )
}
