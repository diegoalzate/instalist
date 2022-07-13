import { useMutation } from 'react-query'
import { queryClient } from '../pages/_app'
import { supabase } from '../client'
import { async } from 'validate.js'
type RemoveListType = {
  id?: string
}

export const useDeleteList = () => {
  return useMutation(
    async (list: RemoveListType) => {
      await supabase.from('lists').delete().match({ id: list.id })
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries('Lists')
      },
    }
  )
}
