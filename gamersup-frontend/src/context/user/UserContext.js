import { createContext, useReducer } from 'react'
import userReducer from './UserReducer'
import axios from 'axios'

const UserContext = createContext()

const API_URL = process.env.REACT_APP_BACKEND_API_URL

const EMAIL_SESSION = "authenticatedEmail";

export const UserProvider = ({ children }) => {
  const initialState = {
    userEmail: '',
    loggedIn: false,
    error: false,
  }

  const [state, dispatch] = useReducer(userReducer, initialState)

  const executeAuthenticationService = (email, password) => {
    axios
      .post(`${API_URL}/account/authenticate`, {
        email,
        password,
      })
      .then((response) => {
        sessionStorage.setItem(EMAIL_SESSION, email)
        //response.data.jwt 
        console.log(response)
        dispatch({
          type: 'LOGIN',
          payload: email,
        })
      })
      .catch(() => {
        dispatch({
          type: 'CREDENTIAL_ERROR',
        })
      })
  }

  const logout = () => {
    sessionStorage.removeItem(EMAIL_SESSION);
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
        executeAuthenticationService,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserContext
