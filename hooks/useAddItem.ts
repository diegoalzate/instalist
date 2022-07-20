import { useMutation } from 'react-query'
import { queryClient } from '../pages/_app'
import { supabase } from '../client'
import { useUser } from '@supabase/auth-helpers-react';

import { Item } from '../types'
type AddItemType = {
  name: string
  url?: string
  listId?: string
}

export const useAddItem = () => {
  const { user } = useUser()

  return useMutation(
    async (newItem: AddItemType) => {
      const res = await supabase.from('items').insert({
        name: newItem.name,
        url: newItem.url,
        list_id: newItem.listId,
        profile_id: user?.id,
      } as Item)
      return res.body?.[0] as Item
    },
    {
      onSuccess: async (res) => {
        await queryClient.invalidateQueries([`Items`, res?.list_id])
      },
    }
  )
}
