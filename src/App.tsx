import { Suspense, lazy } from 'react'
import './assets/css/styles.css'
import { Switch, Route } from 'react-router-dom'
import WebLayout from './containers/Layout'
// components
import SuspenseFallback from './components/shared/SuspenseFallback'

// pages
const Home = lazy(() => import('./pages/Home'))
const List = lazy(() => import('./pages/List'))
const Authenticate = lazy(() => import('./pages/Authenticate'))
const Profile = lazy(() => import('./pages/Profile'))

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/list" exact>
          <Suspense fallback={<SuspenseFallback />}>
            <WebLayout>
              <List />
            </WebLayout>
          </Suspense>
        </Route>
        <Route path="/" exact>
          <Suspense fallback={<SuspenseFallback />}>
            <WebLayout>
              <Home />
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
        <Route path="/profile" exact>
            <Suspense fallback={<SuspenseFallback />}>
              <WebLayout>
                <Profile />
              </WebLayout>
            </Suspense>
          </Route>
      </Switch>
    </div>
  )
}

export default App;
