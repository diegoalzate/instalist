import { Redirect, Route, RouteProps } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ProtectedRoute = ({ children, ...props }: RouteProps) => {
  const { isAuthenticated } = useAuth()
  return (
    <Route
      {...props}
      render={() =>
        isAuthenticated ? children : <Redirect to={{ pathname: '/login' }} />
      }
    />
  )
}

export default ProtectedRoute
