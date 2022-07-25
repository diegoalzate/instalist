/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '@supabase/auth-helpers-react'
// UI
import {
  Button,
  Center,
  Divider,
  FormControl,
  FormHelperText,
  Input,
  VStack,
} from '@chakra-ui/react'
import { CgSpinner } from 'react-icons/cg'
export interface IState {
  loading: Boolean
  success: Boolean
  signInWithOneTimeLink: (email: string) => void
  signInWithDiscord: () => void
}

const LoginForm = ({
  signInWithDiscord,
  signInWithOneTimeLink,
  loading,
  success,
}: IState) => {
  const history = useRouter()
  const { user } = useUser()
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (user) {
      history.push('/list')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <div className="flex items-center justify-center">
      <div className="border-gray-200 border-2 bg-white p-8 rounded-xl shadow-2xl">
        <h2 className="text-xl font-bold mb-10 text-center text-red-400">
          Login
        </h2>
        <VStack mb={4}>
          <Center>
            <Button
              minW={['xs', 'sm']}
              colorScheme="purple"
              backgroundColor={'#7289da'}
              onClick={signInWithDiscord}
            >
              Sign in with Discord
            </Button>
          </Center>
        </VStack>
        <Divider />
        <VStack mt={4} spacing={'10'}>
          <FormControl isRequired>
            <Input
              placeholder="email"
              type={'email'}
              name="email"
              value={email}
              onChange={(value: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(value.target.value)
              }}
            />
            <FormHelperText>We'll never share your email.</FormHelperText>
          </FormControl>
          <Center>
            <Button
              minW={['xs', 'sm']}
              colorScheme="pink"
              onClick={() => {
                signInWithOneTimeLink(email)
              }}
            >
              {loading ? (
                <CgSpinner size={20} className="a-spinner mx-auto" />
              ) : success ? (
                'Email sent'
              ) : (
                'Login with magic link'
              )}
            </Button>
          </Center>
        </VStack>
      </div>
    </div>
  )
}

export default LoginForm
