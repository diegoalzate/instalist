import {
  Button,
  Flex,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useClipboard,
} from '@chakra-ui/react'
import { DotsVerticalIcon } from '@heroicons/react/outline'
import { useEffect, useState } from 'react'
import { Sidebar } from '../components/shared/Sidebar'
import WishForm from '../components/shared/WishForm'
import WishList from '../components/shared/WishList'
import { useDeleteList } from '../hooks'
import { useAddItem } from '../hooks/useAddItem'
import { useLists } from '../hooks/useLists'
import { List as ListType } from '../types'

export interface IWish {
  id?: string
  wish?: string
  url?: string
}

const List = () => {
  const [form, setForm] = useState<IWish>()
  const { data } = useLists()
  const { mutate: saveItem } = useAddItem()
  const [selectedList, setSelectedList] = useState<ListType | undefined>()
  const { mutate: deletelist } = useDeleteList()
  const [showShare, setShowShare] = useState(false)
  const { hasCopied, onCopy } = useClipboard(
    `${window.location.origin}/list/${selectedList?.id}`
  )

  useEffect(() => {
    if (!selectedList || !data?.find((list) => list.id === selectedList.id)) {
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
    if (form?.wish) {
      saveItem({
        name: form.wish,
        url: form.url,
        listId: selectedList?.id,
      })
      setForm({})
    }
  }
  const handleSelectedList = (id: string) => {
    setSelectedList(data?.find((list) => list.id === id))
  }

  const lastWordWithUnderline = () => {
    return selectedList?.name?.split(' ').map((word, index, arr) =>
      index !== arr.length - 1 ? (
        `${word} `
      ) : (
        <span
          key={index}
          className="underline decoration-wavy decoration-blue-400"
        >
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
        <div className="self-end mx-4">
          <Menu>
            <MenuButton
              bgColor={'inherit'}
              _hover={{ backgroundColor: 'inherit' }}
              _active={{ backgroundColor: 'inherit' }}
              _focus={{
                backgroundColor: 'inherit',
              }}
              as={Button}
              rightIcon={<DotsVerticalIcon width={20} />}
            ></MenuButton>
            <MenuList>
              <MenuItem
                rounded={'md'}
                _focus={{ backgroundColor: 'inherit' }}
                _hover={{ backgroundColor: 'whatsapp.100' }}
                onClick={async () => {
                  deletelist({ id: selectedList?.id })
                }}
              >
                Delete
              </MenuItem>
              <MenuItem
                rounded={'md'}
                _focus={{ backgroundColor: 'inherit' }}
                _hover={{ backgroundColor: `${!showShare && 'whatsapp.100'}` }}
                onClick={async () => {
                  if (!showShare) {
                    setShowShare(true)
                    setTimeout(() => {setShowShare(false)}, 4000)
                  }
                }}
                closeOnSelect={false}
              >
                {showShare ? (
                  <Flex mb={2}>
                    <Input
                      value={`${window.location.origin}/list/${selectedList?.id}`}
                      isReadOnly
                    />
                    <Button onClick={() => {onCopy()}} ml={2}>
                      {hasCopied ? 'Copied' : 'Copy'}
                    </Button>
                  </Flex>
                ) : (
                  'Share'
                )}
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
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
          <WishList selectedList={selectedList} />
        </section>
      </div>
    </div>
  )
}

export default List
