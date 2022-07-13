import { Flex, IconButton } from '@chakra-ui/react'
import { MenuIcon, PlusIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import { CgSpinner } from 'react-icons/cg'
import { useRouter } from 'next/router'
import { useLists } from '../../hooks/useLists'
import { List } from '../../types'
import { NavItem } from './NavItem'

type SidebarPropsType = {
  lists?: List[]
  selectedList?: List
  handleSelectedList: (id: string) => void
}

export const Sidebar = ({lists, selectedList, handleSelectedList}: SidebarPropsType) => {
  const history = useRouter()
  const { isLoading } = useLists()
  const [navSize, setNavSize] = useState<'large' | 'small'>('large')
  const toggleNavSize = () => {
    if (navSize === 'large') {
      setNavSize('small')
    } else {
      setNavSize('large')
    }
  }
  return (
    <Flex
      pos={'sticky'}
      left="5"
      h="90vh"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      width={navSize === 'small' ? '80px' : '200px'}
      borderRadius={navSize === 'small' ? '15px' : '30px'}
      flexDir={'column'}
      justifyContent={'space-between'}
      p={'12px'}
    >
      <Flex alignItems={'flex-start'} flexDir="column" as="nav">
        <IconButton
          icon={<MenuIcon width={20} />}
          aria-label={'menu button'}
          mt={5}
          _hover={{ background: 'none' }}
          _active={{
            backgroundColor: '--chakra-colors-primaryAction',
          }}
          alignSelf={navSize === 'small' ? 'center' : 'flex-start'}
          onClick={toggleNavSize}
        />
        {isLoading ? (
          <CgSpinner size={20} className="a-spinner" />
        ) : (
          lists?.map((list) => (
            <NavItem
              key={list.id}
              id={list.id}
              navSize={navSize}
              value={list.name ?? ''}
              emoji={list.emoji}
              active={list.id === selectedList?.id}
              onClick={handleSelectedList}
            />
          ))
        )}
      </Flex>
      <IconButton
        aria-label="Add wish"
        bgColor={'red.400'}
        textColor={'white'}
        icon={<PlusIcon className="max-h-4" />}
        onClick={() => {
          history.push('/create-list')
        }}
      />
    </Flex>
  )
}
