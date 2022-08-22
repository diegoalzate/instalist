import { Skeleton } from '@chakra-ui/react'
import { LinkPreview } from '@dhaiwat10/react-link-preview'
import {
  CheckCircleIcon,
  XIcon,
  HeartIcon as HeartOutline,
} from '@heroicons/react/outline'
import { HeartIcon } from '@heroicons/react/solid'
import { useEffect, useState } from 'react'
import { useDeleteItem, useEditItem, useProfile } from '@/hooks'
import { Item } from '@/types'

const INSTAGRAM_HOSTNAME = 'www.instagram.com'
const RLP_PROXY_URL = 'https://react-link-preview-instalist.herokuapp.com/?url='
type WishProps = {
  item: Item
  owner: boolean
}

const Wish = ({ item, owner }: WishProps) => {
  const { mutate } = useDeleteItem()
  const { data: profile } = useProfile()
  const { mutate: editItem, isLoading } = useEditItem()
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
          width={20}
          className={`self-end hover:text-red-400`}
          onClick={() => {
            mutate({ id, listId: list_id })
          }}
        />
      )
    } else {
      return (
        <CheckCircleIcon
          width={20}
          className={`self-end hover:text-red-400 ${
            bought ? 'text-green-400' : ''
          }`}
          onClick={() => {
            editItem({
              item: { ...item, bought: !item.bought, bought_by: profile?.id },
            })
          }}
        />
      )
    }
  }

  const renderFavorite = () => {
    if (isLoading) return <Skeleton h={10} />
    if (owner) {
      return item.favorite ? (
        <HeartIcon
          width={20}
          className={`self-start hover:text-red-400`}
          color={`${'bg-red-400'}`}
          onClick={() => {
            editItem({
              item: { ...item, favorite: !item.favorite },
            })
          }}
        />
      ) : (
        <HeartOutline
          width={20}
          className={`self-start hover:text-red-400`}
          color={`${'bg-red-400'}`}
          onClick={() => {
            editItem({
              item: { ...item, favorite: !item.favorite },
            })
          }}
        />
      )
    }
  }

  const topCardActions = () => {
    return (
      <div className="flex justify-between">
        {renderFavorite()}
        {renderIcon()}
      </div>
    )
  }

  const fetchInstagramImage = async () => {
    if (item.url) {
      const url = new URL(item.url)
      if (url.hostname === INSTAGRAM_HOSTNAME) {
        try {
          const response = await fetch(
            `${
              typeof window !== undefined && window.location.origin
            }/api/instagram`,
            {
              method: 'POST',
              body: JSON.stringify({ url: item.url }),
            }
          )
          const responsJSON = await response.json()
          setImageSrc(responsJSON.thumbnail_url)
          return {
            title: responsJSON.author_name,
            image: responsJSON.thumbnail_uz,
          }
        } catch (e) {
          console.error(e)
        }
      }
    }
  }

  return (
    <div className="flex flex-col space-y-2 mb-2 rounded border-2 p-2 w-72">
      {topCardActions()}
      {isLoading ? (
        <Skeleton h={20} />
      ) : (
        <h1
          className={`text-lg text-gray-800 ${
            !owner && bought ? 'line-through' : ''
          }`}
        >
          {name}
        </h1>
      )}
      <LinkPreview
        url={item.url ?? ''}
        descriptionLength={0}
        fetcher={() => {
          return fetch(RLP_PROXY_URL + item.url).then((res) =>
            res.json().then(({ metadata }) => ({
              title: metadata.meta.title ?? '',
              description: '',
              image: metadata.og.image,
              hostname: '',
              siteName: metadata.og?.site_name ?? '',
            }))
          )
        }}
        explicitImageSrc={imageSrc}
        imageHeight={'200px'}
        showLoader={false}
      />
    </div>
  )
}

export default Wish
