import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from '../context/AuthContext'
import { extendTheme } from '@chakra-ui/react'
import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClient, QueryClientProvider } from 'react-query'
import NextHead from "next/head";
import WebLayout from '../containers/Layout'
import '../assets/css/styles.css'

const theme = extendTheme({
  colors: {
    primary: 'rgb(251 113 133)',
    primaryAction: 'rgb(253 164 175)',
    secondary: 'rgb(156 163 175)',
  },
})

export const queryClient = new QueryClient()


function MyApp({ Component, pageProps }: any) {
  return (
      <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <ChakraProvider theme={theme}>
              <WebLayout>
               <Component {...pageProps} /> 
              </WebLayout>
              <ReactQueryDevtools />
            </ChakraProvider>
          </AuthProvider>
      </QueryClientProvider>
  )
}

export default MyApp
