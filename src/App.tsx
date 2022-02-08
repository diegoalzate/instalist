import { Suspense, lazy } from 'react'
import './assets/css/styles.css'
import { Switch, Route } from 'react-router-dom'
import WebLayout from './containers/Layout'
import { ChakraProvider } from '@chakra-ui/react'
// components
import SuspenseFallback from './components/shared/SuspenseFallback'
import Authenticate from './pages/Authenticate'

// pages
const Home = lazy(() => import('./pages/Home'))

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <Switch>
          <Route path="/" exact>
            <Suspense fallback={<SuspenseFallback/>}>
              <WebLayout>
                <Home/>
              </WebLayout>
            </Suspense>
          </Route>
          <Route path="/login" exact>
            <Suspense fallback={<SuspenseFallback />}>
              <WebLayout>
                <Authenticate />
              </WebLayout>
            </Suspense>
          </Route>
        </Switch>
      </ChakraProvider>
    </div>
  )
}

export default App;
