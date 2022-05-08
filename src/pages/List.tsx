import { useState } from 'react'
import { Sidebar } from '../components/shared/Sidebar'
import WishForm from '../components/shared/WishForm'
import WishList from '../components/shared/WishList'

export interface IWish {
  id?: string
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
      [name]: value,
    })
  }
  const addItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (form) {
      setWishes([...wishes, { ...form, id: `${wishes.length + 1}` }])
      setForm({})
    }
  }

  const deleteHandler = (wish: IWish) => {
    setWishes(wishes.filter((w) => w.id !== wish.id))
  }

  return (
    <div className="flex items-start space-x-8 w-full">
      <Sidebar />
      <div className="flex flex-col justify-center grow">
        <h1 className="self-center my-4 text-xl">
          my{' '}
          <span className="underline decoration-wavy decoration-blue-400">
            list
          </span>
        </h1>
        <div className="self-center space-x-3">
          <WishForm
            handleChange={handleChange}
            value={form?.wish || ''}
            url={form?.url || ''}
            onClick={addItem}
          />
        </div>
        <section id="wishes" className="mt-6 px-2">
          <WishList wishes={wishes} deleteHandler={deleteHandler} />
        </section>
      </div>
    </div>
  )
}

export default List
