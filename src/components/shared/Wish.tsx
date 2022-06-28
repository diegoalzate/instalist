import { Skeleton } from '@chakra-ui/react'
import { CheckCircleIcon, XIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import { queryClient } from '../..'
import { supabase } from '../../client'
import { useProfile } from '../../hooks'
import { useBoughtItem } from '../../hooks/useBoughtItem'
import { useDeleteItem } from '../../hooks/useDeleteItem'
import { Item } from '../../types'

type WishProps = {
  item: Item
  owner: boolean
}

const Wish = ({ item, owner }: WishProps) => {
  const { mutate } = useDeleteItem()
  const { mutate: boughtItem, isLoading } = useBoughtItem()
  const { bought, name, url, id, list_id } = item
  const renderIcon = () => {
    if (isLoading) return <Skeleton h={10} />
    if (owner) {
      return (
        <XIcon
          className={`max-h-4 self-end hover:text-red-400`}
          onClick={() => {
            mutate({ id, listId: list_id })
          }}
        />
      )
    } else {
      return (
        <CheckCircleIcon
          className={`max-h-4 self-end hover:text-red-400 ${
            bought ? 'text-green-400' : ''
          }`}
          onClick={() => {
            boughtItem({ item: item })
          }}
        />
      )
    }
  }
  return (
    <div className="flex flex-col space-y-2 mb-2 rounded border-2 p-2 w-72 sm:w-96">
      {renderIcon()}
      {isLoading ? (
        <Skeleton h={20} />
      ) : (
        <h1 className={`text-lg text-gray-800 ${bought ? 'line-through' : ''}`}>
          {name}
        </h1>
      )}
      <a href={url} target="_blank" rel="noreferrer" className={`text-sm`}>
        {url}
      </a>
    </div>
  )
}

export default Wish
