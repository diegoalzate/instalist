import { Center, Flex, Input, ListItem, UnorderedList } from '@chakra-ui/react'
import { useState } from 'react'
const List = () => {
  const [wish, setWish] = useState('')
  const [wishes, setWishes] = useState<String[]>([])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setWish(value)
  }
  const addItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    setWishes([...wishes, wish])
  }
  return (
    <div className="container flex flex-col justify-center">
      <h1 className="self-center my-4">my list</h1>
      <div className="self-center space-x-3">
        <Flex>
          <Input
            onChange={handleChange}
            value={wish}
            mr="4"
            focusBorderColor="red.400"
          />
          <button
            hidden={!wish}
            className="rounded bg-red-400 py-1 px-4 text-gray-100 hover:bg-red-800"
            onClick={addItem}
          >
            add
          </button>
        </Flex>
      </div>
      <section id="wishes" className="mt-2">
        <Center>
          <UnorderedList>
            {wishes.map((wish, i) => (
              <ListItem key={i}>{wish}</ListItem>
            ))}
          </UnorderedList>
        </Center>
      </section>
    </div>
  )
}

export default List
