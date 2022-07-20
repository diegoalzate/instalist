import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClient, QueryClientProvider } from 'react-query'
import { UserProvider } from '@supabase/auth-helpers-react';
import NextHead from "next/head";
import WebLayout from '../containers/Layout'
import "@/styles/globals.css";
import ErrorBoundary from '@/components/shared/ErrorBoundary'
import { supabase } from '@/client'
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
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
          <UserProvider supabaseClient={supabase}>
            <ChakraProvider theme={theme}>
              <NextHead >
                <title>Instalist</title>
              </NextHead>
              <WebLayout>
               <Component {...pageProps} /> 
              </WebLayout>
              <ReactQueryDevtools />
            </ChakraProvider>
          </UserProvider>
      </QueryClientProvider>
      </ErrorBoundary>
  )
}

export default MyApp
