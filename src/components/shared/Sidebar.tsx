import { Flex, IconButton } from '@chakra-ui/react'
import { MenuIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import { NavItem } from './NavItem'

export const Sidebar = () => {
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
      h="95vh"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      width={navSize === 'small' ? '60px' : '200px'}
      borderRadius={navSize === 'small' ? '15px' : '30px'}
      flexDir={'column'}
      justifyContent={'flex-start'}
    >
      <Flex alignItems={'flex-start'} flexDir='column' as='nav' p={'8px'}>
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
    </Flex>
  )
}
