import { Center, Flex } from '@chakra-ui/react'
import { IWish } from '../../pages/List'
import Wish from './Wish'

interface IWishListProps {
  wishes: IWish[]
  deleteHandler: (wish: IWish) => void
}

const WishList = ({ wishes, deleteHandler }: IWishListProps) => {
  return (
    <Center>
      <Flex direction={'column-reverse'}>
        {wishes.map((wish, i) => (
          <Wish key={i} wish={wish} deleteHandler={deleteHandler} />
        ))}
      </Flex>
    </Center>
  )
}

export default WishList
