import { Suspense, lazy } from 'react'
import './assets/css/styles.css'
import { Switch, Route } from 'react-router-dom'
import WebLayout from './containers/Layout'
// components
import SuspenseFallback from './components/shared/SuspenseFallback'
// pages
const Home = lazy(() => import('./pages/Home'))

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/">
          <Suspense fallback={<SuspenseFallback/>}>
            <WebLayout>
              <Home/>
            </WebLayout>
          </Suspense>
        </Route>
      </Switch>
    </div>
  )
}

export default App;
