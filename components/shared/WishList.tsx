import { Center, Flex, Skeleton } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useItems, useProfile } from '../../hooks'
import { List } from '../../types'
import Wish from './Wish'

type WishListProps = {
  selectedList?: List
}

const WishList = ({ selectedList }: WishListProps) => {
  const [owner, setOwner] = useState(false)
  const {data: profile} = useProfile()
  const { data: items, isLoading } = useItems({ selectedList })

  useEffect(() => {
    if (selectedList) {
      if (profile?.id === selectedList.profile_id) {
        setOwner(true)
      }
    }
  }, [profile?.id, selectedList])

  return (
    <Center>
      {isLoading ? (
        <Skeleton height="20px" />
      ) : (
        <Flex direction={'column-reverse'}>
          {items?.map((item, i) => (
            <Wish
              key={i}
              item={item}              
              owner={owner}
            />
          ))}
        </Flex>
      )}
    </Center>
  )
}

export default WishList
