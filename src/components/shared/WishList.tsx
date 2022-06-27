import { Center, Flex, Skeleton } from '@chakra-ui/react'
import { useItem } from '../../hooks'
import { List } from '../../types'
import Wish from './Wish'

type WishListProps = {
  selectedList?: List
}

const WishList = ({ selectedList }: WishListProps) => {
  const { data: items, isLoading } = useItem({ selectedList })

  return (
    <Center>
      {isLoading ? (
        <Skeleton height="20px" />
      ) : (
        <Flex direction={'column-reverse'}>
          {items?.map((item, i) => (
            <Wish
              key={i}
              name={item.name}
              url={item.url}
              id={item.id}
              bought={false}
            />
          ))}
        </Flex>
      )}
    </Center>
  )
}

export default WishList
