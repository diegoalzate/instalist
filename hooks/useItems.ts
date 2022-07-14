import { useQuery } from "react-query"
import { supabase } from "../client"
import { useAuth } from "../context/AuthContext"
import { List, Item } from "../types"

type useItemProps = {
    selectedList?:  List
}

export const useItems = ({selectedList}: useItemProps) => {
    return useQuery(
      ['Items', selectedList?.id],
      async () => {
        const { data, error } = await supabase
          .from('items')
          .select()
          .eq('list_id', selectedList?.id)
  
        if (error) return
  
        return data as Item[]
      },
      {
        enabled: !!selectedList?.id,
      }
    )
}