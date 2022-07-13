import { Skeleton } from '@chakra-ui/react'
import { LinkPreview } from '@dhaiwat10/react-link-preview'
import { CheckCircleIcon, XIcon } from '@heroicons/react/outline'
import { useEffect, useState } from 'react'
import { useBoughtItem } from '../../hooks/useBoughtItem'
import { useDeleteItem } from '../../hooks/useDeleteItem'
import { Item } from '../../types'

const INSTAGRAM_HOSTNAME = "www.instagram.com";

type WishProps = {
  item: Item
  owner: boolean
}

const Wish = ({ item, owner }: WishProps) => {
  const { mutate } = useDeleteItem()
  const { mutate: boughtItem, isLoading } = useBoughtItem()
  const [imageSrc, setImageSrc] = useState<string>()
  const { bought, name, url, id, list_id } = item
  useEffect(() => {
    fetchInstagramImage()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.url])
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

  const fetchInstagramImage = async () => {
    if (item.url) {
      const url = new URL(item.url)
      if (url.hostname === INSTAGRAM_HOSTNAME) {
        try {
          const response = await fetch(`${typeof window !== undefined && window.location.origin}/api/instagram`, {
            method: "POST",
            body: JSON.stringify({url: item.url})
          })
          const responsJSON = await response.json()
          setImageSrc(responsJSON.thumbnail_url)
          return {
            title: responsJSON.author_name,
            image: responsJSON.thumbnail_uz
          }
        } catch (e) {
          console.error(e)
        }
      }
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
        <LinkPreview url={item.url ?? ""} descriptionLength={0} explicitImageSrc={imageSrc} imageHeight={"200px"} />
      </a>
    </div>
  )
}

export default Wish
