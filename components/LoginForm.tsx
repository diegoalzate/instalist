/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../context/AuthContext'
// UI
import { Button, Center, Divider, FormControl, FormHelperText, Input, VStack } from '@chakra-ui/react'
import { CgSpinner } from 'react-icons/cg'
export interface IState {
  loading: Boolean
  signInWithOneTimeLink: (email: string) => void
  signInWithDiscord: () => void
}

const LoginForm = ({
  signInWithDiscord,
  signInWithOneTimeLink,
  loading
}: IState) => {
  const history = useRouter()
  const { isAuthenticated } = useAuth()
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/list')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  return (
    <div className="mx-auto min-h-screen flex items-center justify-center">
      <div className="border-gray-200 border-2 bg-white p-8 rounded-xl h-96 shadow-2xl ">
        <h2 className="text-xl font-bold mb-10 text-center text-red-400">Login</h2>
        <VStack mb={4} width={'full'}>
          <Center>
            <Button minW={'sm'} colorScheme="purple" backgroundColor={'#7289da'} onClick={signInWithDiscord}>
            Sign in with Discord
            </Button>
          </Center>
        </VStack>
        <Divider />
        <VStack mt={4} spacing={'10'} width={'full'}>
            <FormControl isRequired>
              <Input 
                placeholder='email' 
                type={'email'} 
                name='email' 
                value={email} 
                onChange={(value: React.ChangeEvent<HTMLInputElement>) => {setEmail(value.target.value)}}/>
              <FormHelperText>We'll never share your email.</FormHelperText>
            </FormControl>
            <Center>
                <Button minW={'sm'} colorScheme="pink" onClick={() => {signInWithOneTimeLink(email)}}>
                  {loading ? (
                    <CgSpinner size={20} className="a-spinner mx-auto" />
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
