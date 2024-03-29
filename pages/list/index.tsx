import { supabase } from '@/client'
import {
  Button,
  Flex,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useClipboard,
  useDisclosure,
} from '@chakra-ui/react'
import {
  DotsVerticalIcon,
  LockClosedIcon,
  LockOpenIcon,
} from '@heroicons/react/outline'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { CgLock, CgLockUnlock } from 'react-icons/cg'
import { Sidebar } from '@/components/shared/Sidebar'
import WishForm from '@/components/shared/WishForm'
import WishList from '@/components/shared/WishList'
import {
  useDeleteList,
  useEditList,
  useProfile,
  useAddItem,
  useLists,
} from '@/hooks'
import { List, List as ListType } from '@/types'

export interface IWish {
  id?: string
  wish?: string
  url?: string
}

const List = () => {
  const [form, setForm] = useState<IWish>()
  const { data } = useLists()
  const { mutate: saveItem } = useAddItem()
  const { mutate: editList } = useEditList()
  const [selectedList, setSelectedList] = useState<ListType | undefined>()
  const { mutate: deletelist } = useDeleteList()
  const [showShare, setShowShare] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { hasCopied, onCopy } = useClipboard(
    `${typeof window !== 'undefined' ? window.location.origin : ''}/list/${
      selectedList?.id
    }`
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

  const toggleLocked = () => {
    editList(
      { list: { ...selectedList, locked: !selectedList?.locked } as List },
      {
        onSuccess: (res) => {
          setSelectedList(res?.[0])
        },
      }
    )
  }

  return (
    <div className="flex items-start justify-around lg:justify-between space-x-8 w-screen ">
      <AlertProfile />
      <Sidebar
        lists={data}
        handleSelectedList={handleSelectedList}
        selectedList={selectedList}
      />
      <div className="flex flex-col flex-grow">
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
                _hover={{ backgroundColor: `${!showShare && 'whatsapp.100'}` }}
                onClick={async () => {
                  if (!showShare) {
                    setShowShare(true)
                    setTimeout(() => {
                      setShowShare(false)
                    }, 4000)
                  }
                }}
                closeOnSelect={false}
              >
                {showShare ? (
                  <Flex mb={2}>
                    <Input
                      value={`${
                        typeof window !== 'undefined'
                          ? window.location.origin
                          : ''
                      }/list/${selectedList?.id}`}
                      isReadOnly
                    />
                    <Button
                      onClick={() => {
                        onCopy()
                      }}
                      ml={2}
                    >
                      {hasCopied ? 'Copied' : 'Copy'}
                    </Button>
                  </Flex>
                ) : (
                  'Share'
                )}
              </MenuItem>
              <MenuItem
                rounded={'md'}
                _focus={{ backgroundColor: 'inherit' }}
                _hover={{ backgroundColor: 'whatsapp.100' }}
                onClick={onOpen}
              >
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
        <div className="self-center flex space-x-2 items-center">
          <h1 className="text-xl">{lastWordWithUnderline()}</h1>
          <span className="cursor-pointer" onClick={toggleLocked}>
            {selectedList?.locked ? <CgLock /> : <CgLockUnlock />}
          </span>
        </div>
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            Are you  sure you want to delete the list?
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='solid' onClick={async () => {
                  deletelist({ id: selectedList?.id })
                  onClose()
                }}>Confirm</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

const AlertProfile = () => {
  const { data } = useProfile()
  if (data) {
    return !data?.name ? (
      <Link href={'/profile'}>
        <div className="bg-blue-300 space-x-4 text-gray-50 flex justify-center items-center w-screen absolute top-10 text-center h-12 rounded-b-md ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <p className="font-bold">Finish up your profile</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </div>
      </Link>
    ) : null
  } else {
    return null
  }
}
export default List

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user, data } = await supabase.auth.api.getUserByCookie(req)
  if (!user) {
    // If no user, redirect to index.
    return { props: {}, redirect: { destination: '/', permanent: false } }
  }

  // If there is a user, return it.
  return { props: { user } }
}
