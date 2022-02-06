import { Suspense, lazy } from 'react'
import './assets/css/styles.css'
import { Switch, Route } from 'react-router-dom'
import WebLayout from './containers/Layout'
// components
import SuspenseFallback from './components/shared/SuspenseFallback'
import Authenticate from './pages/Authenticate'

// pages
const Home = lazy(() => import('./pages/Home'))

function App() {
  return (
    <div className="App">
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
    </div>
  )
}

export default App;
