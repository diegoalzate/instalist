import { Suspense, lazy } from 'react'
import './assets/css/styles.css'
import { Switch, Route } from 'react-router-dom'
import WebLayout from './containers/Layout'
// components
import SuspenseFallback from './components/shared/SuspenseFallback'
// pages
const Home = lazy(() => import('./pages/Home'))
const SignIn = lazy(() => import('./pages/SignIn'))

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/">
          <Suspense fallback={<SuspenseFallback/>}>
            <WebLayout>
              <SignIn/>
            </WebLayout>
          </Suspense>
        </Route>
      </Switch>
    </div>
  )
}

export default App;
