import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from './context/AuthContext'
import { extendTheme } from '@chakra-ui/react'
import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClient, QueryClientProvider } from 'react-query'

const theme = extendTheme({
  colors: {
    primary: 'rgb(251 113 133)',
    primaryAction: 'rgb(253 164 175)',
    secondary: 'rgb(156 163 175)',
  },
})

export const queryClient = new QueryClient()

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <ChakraProvider theme={theme}>
            <App />
            <ReactQueryDevtools />
          </ChakraProvider>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
