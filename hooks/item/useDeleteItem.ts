import { useMutation } from 'react-query'
import { queryClient } from '../../pages/_app'
import { supabase } from '../../client'
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
      onSuccess: async (res) => {
        await queryClient.invalidateQueries(['Items', res.listId])
      },
    }
  )
}
