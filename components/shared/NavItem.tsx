import { Flex, Link, Menu, MenuButton, Text } from "@chakra-ui/react"

type NavItemPropsType = {
  navSize: 'small' | 'large',
  emoji?: string,
  value: string,
  id: string,
  active?: boolean
  onClick: (id: string) => void
}

export const NavItem = ({id, navSize, value, active, emoji, onClick}: NavItemPropsType) => {
  
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
        <Text textAlign={'center'}>{emoji}</Text>
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
          <Text textAlign={'center'} noOfLines={1} textOverflow={'ellipsis'} overflow={'hidden'} ml={0}>{value.slice(0,2)}...</Text>
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
      alignItems={'center'}
      onClick={() => {onClick(id)}}
    >
      <Menu  placement="right">
          <MenuButton
           backgroundColor={active ? "whatsapp.100" : '' }
           p={3}
           borderRadius={8}
           _hover={{ textDecor: '', backgroundColor: '--chakra-colors-primary'}}
           w={active ? '100%' : 'none'}
           >
            {renderContent()}
          </MenuButton>
      </Menu>
    </Flex>
  )
}