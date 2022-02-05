import { Center, ListItem, UnorderedList } from '@chakra-ui/react'
import { useState } from 'react'
import WishForm from '../components/shared/WishForm'

interface IWish {
  wish?: string
  url?: string 
}
const List = () => {
  const [form, setForm] = useState<IWish>()
  const [wishes, setWishes] = useState<IWish[]>([])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    setForm({
      ...form,
      [name]: value
    })
  }
  const addItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (form) {
      setWishes([...wishes, form])
    }
  }
  return (
    <div className="container flex flex-col justify-center">
      <h1 className="self-center my-4">my list</h1>
      <div className="self-center space-x-3">
      <WishForm
        handleChange={handleChange}
        value={form?.wish || ""}
        url={form?.url || ""}
        onClick={addItem}
      />
      </div>
      <section id="wishes" className="mt-2">
        <Center>
          <UnorderedList>
            {wishes.map((wish, i) => (
              <ListItem key={i}>{wish.wish}</ListItem>
            ))}
          </UnorderedList>
        </Center>
      </section>
    </div>
  )
}

export default List
