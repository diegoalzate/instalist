import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from './context/AuthContext'
import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  colors: {
    primary: 'rgb(251 113 133)',
    primaryAction: 'rgb(253 164 175)',
    secondary: 'rgb(156 163 175)',
  },
})

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
