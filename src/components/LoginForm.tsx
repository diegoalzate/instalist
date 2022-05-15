import { useEffect, useState } from 'react'
// import { supabase } from '../client';
import { useHistory } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// UI
import { Button, Center, Divider, FormControl, FormHelperText, Input, VStack } from '@chakra-ui/react'
import 'react-phone-number-input/style.css'
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
  const history = useHistory()
  const { isAuthenticated } = useAuth()
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  return (
    <div>
      <div className="container m-auto min-h-screen flex items-center justify-center">
        <div className="border-gray-200 border-2 bg-white p-8 rounded shadow-2x1 ">
          <h2 className="text-xl font-bold mb-10 text-red-400">Login</h2>
          <VStack mb={4} width={'full'}>
            <Center>
              <Button colorScheme="purple" backgroundColor={'#5865F2'} onClick={signInWithDiscord}>
                Sign in with Discord
              </Button>
            </Center>
          </VStack>
          <Divider />
          <VStack mt={4} spacing={'4'} width={'full'}>
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
                  <Button colorScheme="pink" onClick={() => {signInWithOneTimeLink(email)}}>
                    {loading ? (
                      <CgSpinner size={20} className="a-spinner mx-auto" />
                    ) : (
                      'Login with magick link'
                    )}
                  </Button>
                </Center>
          </VStack>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
