import {
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { ChevronDownIcon, UserIcon, XIcon } from '@heroicons/react/outline'
import { useAuth } from '../context/AuthContext'
import { useProfile } from '../hooks'
import Link from 'next/link'
const Header = () => {
  return (
    <header className="sticky flex top-0 bg-red-400 text-gray-100 font-semibold text-center px-6 align-middle justify-between border-gray-200 z-50">
      <Link href="/">
        <h1 className='self-center'>Instalist</h1>
      </Link>
      <AuthDropdown />
    </header>
  )
}

const AuthDropdown = () => {
  const { signOut } = useAuth()
  const { data } = useProfile()

  return (
    <Menu>
      {({ isOpen }) =>
        data ? (
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
              Hello, {data?.name ?? 'user'}
            </MenuButton>
            <MenuList bgColor={'white'} border={'primary'}>
              <Link href="/profile">
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
              </Link>
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
          <Link href="/login">
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
