import { useMutation } from 'react-query'
import { queryClient } from '..'
import { supabase } from '../client'
type RemoveListType = {
  id?: string
}

export const useDeleteList = () => {
  return useMutation(
    async (list: RemoveListType) => {
      await supabase.from('lists').delete().match({ id: list.id })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('Lists')
      },
    }
  )
}
