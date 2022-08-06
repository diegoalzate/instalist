import { Box, Flex, IconButton, Show, useMediaQuery } from '@chakra-ui/react'
import { MenuIcon, PlusIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import { CgSpinner } from 'react-icons/cg'
import { useRouter } from 'next/router'
import { useLists } from '../../hooks/list/useLists'
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
  const [isMobile] = useMediaQuery("(max-width: 30em)") 
  const toggleNavSize = () => {
    if (navSize === 'large') {
      setNavSize('small')
    } else {
      setNavSize('large')
    }
  }
  return (
    <Box
      left="5"
      display={'flex'}
      h={[navSize === 'small' ? '5vh' : '90vh', '90vh']}
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      width={navSize === 'small' ? '80px' : '200px'}
      borderRadius={navSize === 'small' ? '15px' : '30px'}
      flexDir={'column'}
      justifyContent={'space-between'}
      p={'4px'}
      zIndex={['1', 'auto']}
      pos={['absolute', 'sticky']}
      bgColor={'white'}
>
      <Flex alignItems={'flex-start'} flexDir="column" as="nav">
        <IconButton
          icon={<MenuIcon width={20} />}
          aria-label={'menu button'}
          mt={[-1, 5]}
          ml={[navSize === 'small' ? '0px' : '16px']}
          backgroundColor="inherit"
          _hover={{ background: 'none' }}
          _active={{
            backgroundColor: '--chakra-colors-primaryAction',
          }}
          alignSelf={[navSize === 'small' ? 'center' : 'start']}
          onClick={toggleNavSize}
        />
        {isLoading ? (
          <CgSpinner size={20} className="a-spinner" />
        ) : (
          (navSize === 'large' || !isMobile) &&
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
      <Flex alignSelf={'center'} w={['40%', '80%']}>
        {(navSize === 'large' || !isMobile) && (
          <IconButton
            w='100%'
            aria-label="Add wish"
            bgColor={'red.400'}
            textColor={'white'}
            icon={<PlusIcon width={20} />}
            onClick={() => {
              history.push('/create-list')
            }}
            justifySelf={'center'}
            />
        )}
      </Flex>
    </Box>
  )
}
