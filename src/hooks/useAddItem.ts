import { useMutation } from 'react-query'
import { queryClient } from '..'
import { supabase } from '../client'
import { useAuth } from '../context/AuthContext'
import { Item } from '../types'
type AddItemType = {
  name: string
  url?: string
  listId?: string
}

export const useAddItem = () => {
  const { session } = useAuth()

  return useMutation(
    async (newItem: AddItemType) => {
      await supabase.from('items').insert({
        name: newItem.name,
        url: newItem.url,
        list_id: newItem.listId,
        profile_id: session?.user?.id,
      } as Item)
      return newItem
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries( `${res?.listId}.Items`)
      },
    }
  )
}
