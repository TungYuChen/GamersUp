import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import UserContext from '../context/user/UserContext'

function AuthenticatedRoute({ children }) {
  const { isLoggedIn } = useContext(UserContext)

  if (isLoggedIn()) {
    return children
  } else {
    return <Navigate to='/login' replace={true} />
  }
}

export default AuthenticatedRoute
