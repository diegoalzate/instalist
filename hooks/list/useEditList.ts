import { useMutation } from 'react-query'
import { queryClient } from '../../pages/_app'
import { supabase } from '../../client'
import { List } from '../../types'

export const useEditList = () => {
  return useMutation(
    async ({list}: {list: List}) => {
      delete list.updated_at
      delete list.created_at
      const { data } = await supabase
        .from('lists')
        .update({...list } as List)
        .match({ id: list.id })
      return data as List[]
    },
    {
      onSuccess: async (res) => {
        await queryClient.invalidateQueries(['Lists'])
        return res
      },
    }
  )
}
