import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from './context/AuthContext'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
