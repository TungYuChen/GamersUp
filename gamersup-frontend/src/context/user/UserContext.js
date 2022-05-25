import { createContext, useReducer } from 'react'
import userReducer from './UserReducer'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const initialState = {
    user: {},
    loggedIn: false,
  }

  const [state, dispatch] = useReducer(userReducer, initialState)

  const checkUser = (user) => {
    if(user.username === 'test' && user.password === 'test') {
        dispatch({
            type: 'LOGIN',
            payload: user,

        })
    }
  }

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        loggedIn: state.loggedIn,
        checkUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
