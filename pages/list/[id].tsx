import { useEffect, useState } from 'react'
import { supabase } from '../../client'
import WishList from '../../components/shared/WishList'
import { useListFromId, useProfile } from '../../hooks'
import { List as ListType } from '../../types'
import { useRouter } from 'next/router'
export interface IWish {
  id?: string
  wish?: string
  url?: string
}

type GuestParams =  {
    id: string;
}

const Guest = () => {
  const { data: profile } = useProfile()
  const router = useRouter()
  const {id} = router.query
  const { data } = useListFromId(id as string)
  const [selectedList, setSelectedList] = useState<ListType | undefined>()
  
  useEffect(() => {
    if (data && !selectedList) {
      setSelectedList(data?.[0])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  useEffect(() => {
    if(selectedList) {
      if (selectedList.profile_id !== profile?.id) {
        addViewIfNotOwner()
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile?.id, selectedList])

  const addViewIfNotOwner = async () => {
    await supabase
      .from('lists')
      .update({ views: (selectedList?.views ?? 0) + 1 })
      .match({ id: selectedList?.id })
  }

  const lastWordWithUnderline = () => {
    return selectedList?.name?.split(' ').map((word, index, arr) =>
      index !== arr.length - 1 ? (
        `${word} `
      ) : (
        <span
          key={index}
          className="underline decoration-wavy decoration-blue-400"
        >
          {word}
        </span>
      )
    )
  }

  return (
    <div className="flex items-start space-x-8 w-full">
      <div className="flex flex-col justify-center grow">
      <div className="self-start mx-4">
      views: {selectedList?.views}   
        </div>
        <h1 className="self-center my-4 text-xl">{lastWordWithUnderline()}</h1>
        <section id="wishes" className="mt-6 px-2">
          <WishList selectedList={selectedList} />
        </section>
      </div>
    </div>
  )
}

export default Guest
