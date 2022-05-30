import { createContext, useReducer } from 'react'
import userReducer from './UserReducer'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const initialState = {
    userEmail: '',
    loggedIn: false,
  }

  const [state, dispatch] = useReducer(userReducer, initialState)

  const checkUserCredentials = (email, password) => {
    if (email === 'test@qq.com' && password === 'test') {
      dispatch({
        type: 'LOGIN',
        payload: email,
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
        checkUserCredentials,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserContext
