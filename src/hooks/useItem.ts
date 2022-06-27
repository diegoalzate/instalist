import { useQuery } from "react-query"
import { supabase } from "../client"
import { useAuth } from "../context/AuthContext"
import { List, Item } from "../types"

type useItemProps = {
    selectedList?:  List
}

export const useItem = ({selectedList}: useItemProps) => {
    const { session } = useAuth()

    return useQuery(
      `${selectedList?.id}.items`,
      async () => {
        const { data, error } = await supabase
          .from('items')
          .select()
          .eq('list_id', selectedList?.id)
  
        if (error) return
  
        return data as Item[]
      },
      {
        enabled: !!session?.user?.id && !!selectedList?.id,
      }
    )
}