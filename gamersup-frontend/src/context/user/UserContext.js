import { createContext, useReducer } from 'react'
import userReducer from './UserReducer'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const initialState = {
    userEmail: '',
    loggedIn: false,
    error: false,
  }

  const [state, dispatch] = useReducer(userReducer, initialState)

  const checkUserCredentials = (email, password) => {
    if (email === 'test@qq.com' && password === 'test') {
      dispatch({
        type: 'LOGIN',
        payload: email,
      })
    } else {
      dispatch({
        type: 'CREDENTIAL_ERROR',
      })
    }
  }

  const logout = () => {
    dispatch({
      type: 'LOGOUT',
    })
  }

  return (
    <UserContext.Provider
      value={{
        userEmail: state.userEmail,
        loggedIn: state.loggedIn,
        error: state.error,
        checkUserCredentials,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserContext
