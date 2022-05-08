import { Flex, Link, Menu, MenuButton, Text } from "@chakra-ui/react"

type NavItemPropsType = {
  navSize: 'small' | 'large',
  emoji?: string,
  value: string,
  id: string,
  active?: boolean
}

export const NavItem = ({navSize, value, active, emoji}: NavItemPropsType) => {
  
  const emojiWithText = () => {
       if (navSize === 'large') {
      return (
        <Flex>
        <Text>{emoji}</Text>
        <Text ml={2}>{value}</Text>
      </Flex>
      )
    } else {
      return (
        <Text ml={0}>{emoji}</Text>
      )
    }
  }

  const textWithoutEmoji = () => {
    if (navSize === 'large') {
      return (
        <Flex>
        <Text ml={2}>{value}</Text>
      </Flex>
      )
    } else {
      return (
        <Flex >
          <Text noOfLines={1} textOverflow={'ellipsis'} overflow={'hidden'} ml={0}>{value.slice(0,2)}...</Text>
        </Flex>
      )
    }
  }

  const renderContent = () => {
    return emoji ? emojiWithText() : textWithoutEmoji()
  }

  return (
    <Flex 
      mt={30}
      w="100%"
      alignItems={navSize === 'small' ? 'center' : 'start'}
    >
      <Menu  placement="right">
        <Link
          backgroundColor={active ? "whatsapp.100" : '' }
          p={3}
          borderRadius={8}
          _hover={{ textDecor: '', backgroundColor: '--chakra-colors-primary'}}
          w={active ? '100%' : 'none'}
        >
          <MenuButton>
            {renderContent()}
          </MenuButton>
        </Link>
      </Menu>
    </Flex>
  )
}