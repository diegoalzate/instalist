import {
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { ChevronDownIcon, UserIcon, XIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Header = () => {
  return (
    <header className="fixed flex top-0 inset-x-0 bg-red-400 text-gray-100 font-semibold text-center px-6 align-middle justify-between border-gray-200 border-b-2 z-1000">
      <Link to="/" className='self-center'>
        <h1>Instalist</h1>
      </Link>
      <AuthDropdown />
    </header>
  )
}

const AuthDropdown = () => {
  const { isAuthenticated, signOut } = useAuth()
  return (
    <Menu>
      {({ isOpen }) =>
        isAuthenticated ? (
          <>
            <MenuButton
              alignSelf={'center'}
              as={Button}
              bgColor={'primary'}
              _hover={{
                backgroundColor: '--chakra-colors-primaryAction',
              }}
              _active={{
                backgroundColor: '--chakra-colors-primaryAction',
              }}
              _focus={{
                backgroundColor: '--chakra-colors-primaryAction',
              }}
              rightIcon={
                isOpen ? <XIcon width={20} /> : <ChevronDownIcon width={20} />
              }
            >
              Hello, user
            </MenuButton>
            <MenuList bgColor={'white'} border={'primary'}>
              <MenuItem
                _focus={{
                  textColor: 'blue.400',
                }}
                _active={{
                  textColor: 'green.400',
                }}
                textColor={'primary'}
              >
                {' '}
                Profile
              </MenuItem>
              <MenuDivider />
              <MenuItem
                onClick={signOut}
                _focus={{
                  textColor: 'blue.400',
                }}
                _active={{
                  textColor: 'green.400',
                }}
                textColor={'primary'}
              >
                {' '}
                Sign out
              </MenuItem>
            </MenuList>
          </>
        ) : (
          <Link to="/login">
            <MenuButton
              alignSelf={'center'}
              as={Button}
              _active={{
                backgroundColor: '--chakra-colors-primary',
              }}
              _hover={{
                backgroundColor: '--chakra-colors-primary',
              }}
              _focus={{
                backgroundColor: '--chakra-colors-primary',
              }}
              bgColor={'primary'}
              rightIcon={<UserIcon width={20} />}
            >
              Sign in
            </MenuButton>
          </Link>
        )
      }
    </Menu>
  )
}

export default Header
