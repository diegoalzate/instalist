import { useMutation } from 'react-query'
import { queryClient } from '..'
import { supabase } from '../client'
type RemoveItemType = {
  id: string
  listId?: string
}

export const useDeleteItem = () => {
  return useMutation(
    async (item: RemoveItemType) => {
      await supabase.from('items').delete().match({ id: item.id })
      return item
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries(['Items', res.id])
      },
    }
  )
}
