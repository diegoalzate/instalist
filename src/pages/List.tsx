import { useEffect, useState } from 'react'
import { Sidebar } from '../components/shared/Sidebar'
import WishForm from '../components/shared/WishForm'
import WishList from '../components/shared/WishList'
import { useList } from '../hooks/useList'
import { List as ListType } from '../types'

export interface IWish {
  id?: string
  wish?: string
  url?: string
}

const List = () => {
  const [form, setForm] = useState<IWish>()
  const [wishes, setWishes] = useState<IWish[]>([])
  const { data } = useList()
  const [selectedList, setSelectedList] = useState<ListType | undefined>()

  useEffect(() => {
    if (!selectedList) {
      setSelectedList(data?.[0])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

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

  const handleSelectedList = (id: string) => {
    setSelectedList(data?.find((list) => list.id === id))
  }

  const lastWordWithUnderline = () => {
    return selectedList?.name
      ?.split(' ')
      .map((word, index, arr) =>
        index !== (arr.length - 1) ? (
          `${word} `
        ) : (
          <span className="underline decoration-wavy decoration-blue-400">
            {word}
          </span>
        )
      )
  }

  return (
    <div className="flex items-start space-x-8 w-full">
      <Sidebar
        lists={data}
        handleSelectedList={handleSelectedList}
        selectedList={selectedList}
      />
      <div className="flex flex-col justify-center grow">
        <h1 className="self-center my-4 text-xl">{lastWordWithUnderline()}</h1>
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
