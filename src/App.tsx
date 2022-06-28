import { Suspense, lazy } from 'react'
import './assets/css/styles.css'
import { Switch, Route } from 'react-router-dom'
import WebLayout from './containers/Layout'
// components
import SuspenseFallback from './components/shared/SuspenseFallback'
import ProtectedRoute from './components/ProtectedRoute'

// pages
const Home = lazy(() => import('./pages/Home'))
const List = lazy(() => import('./pages/List'))
const Authenticate = lazy(() => import('./pages/Authenticate'))
const Profile = lazy(() => import('./pages/Profile'))
const CreateList = lazy(() => import('./pages/CreateList'))
const Guest = lazy(() => import('./pages/Guest'))

function App() {
  return (
    <div className="App">
      <Switch>
        <ProtectedRoute path="/list" exact>
          <Suspense fallback={<SuspenseFallback />}>
            <WebLayout>
              <List />
            </WebLayout>
          </Suspense>
        </ProtectedRoute>
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
        <ProtectedRoute path="/profile" exact>
          <Suspense fallback={<SuspenseFallback />}>
            <WebLayout>
              <Profile />
            </WebLayout>
          </Suspense>
        </ProtectedRoute>
        <ProtectedRoute path="/create-list" exact>
          <Suspense fallback={<SuspenseFallback />}>
            <WebLayout>
              <CreateList />
            </WebLayout>
          </Suspense>
        </ProtectedRoute>
        <Route path="/list/:id" exact>
          <Suspense fallback={<SuspenseFallback />}>
            <WebLayout>
              <Guest />
            </WebLayout>
          </Suspense>
        </Route>
      </Switch>
    </div>
  )
}

export default App
