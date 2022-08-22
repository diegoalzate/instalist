import { Center, SimpleGrid, Skeleton } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useItems, useProfile } from '@/hooks'
import { List } from '@/types'
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
        <SimpleGrid columns={[1, 1, 2, 3]} spacingX={['20']} maxW="full">          
          {items?.sort((a,b) => +(b.favorite ?? 0) - +(a.favorite ?? 0)).map((item, i) => (
            <Wish
              key={i}
              item={item}              
              owner={owner}
            />
          ))}
        </SimpleGrid>
      )}
    </Center>
  )
}

export default WishList
