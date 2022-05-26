import { Flex, IconButton } from '@chakra-ui/react'
import { MenuIcon, PlusIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { NavItem } from './NavItem'

export const Sidebar = () => {
  const history = useHistory()
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
      pos={"sticky"}
      left="5"
      h="90vh"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      width={navSize === 'small' ? '60px' : '200px'}
      borderRadius={navSize === 'small' ? '15px' : '30px'}
      flexDir={'column'}
      justifyContent={'space-between'}
      p={'12px'}
    >
      <Flex alignItems={'flex-start'} flexDir='column' as='nav'>
          <IconButton 
            icon={<MenuIcon width={20}/>}
            aria-label={'menu button'}  
            mt={5}
            _hover={{ background: 'none'}} 
            _active={{
              backgroundColor: '--chakra-colors-primaryAction',
            }}
            onClick={toggleNavSize}     
          />
          <NavItem id='1' navSize={navSize} value='default' emoji='😀' active={true}/>
          <NavItem id='2' navSize={navSize} value='second' />
          <NavItem id='3' navSize={navSize} value='third'emoji='🥰' />
      </Flex>
      <IconButton
        aria-label="Add wish"
        bgColor={'red.400'}
        textColor={'white'}
        icon={<PlusIcon className="max-h-4" />}
        onClick={() => {history.push('/create-list')}}
      />
    </Flex>
  )
}
