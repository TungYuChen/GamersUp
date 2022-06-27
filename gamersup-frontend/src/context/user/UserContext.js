import { createContext, useReducer } from 'react'
import userReducer from './UserReducer'
import axios from 'axios'

const UserContext = createContext()

const API_URL = process.env.REACT_APP_BACKEND_API_URL
const EMAIL_SESSION = process.env.REACT_APP_EMAIL_SESSION
const REGISTER_SESSION = process.env.REACT_APP_REGISTER_SESSION

export const UserProvider = ({ children }) => {
  const initialState = {
    userEmail: '',
    loggedIn: false,
    error: false,
    userId: '',
    userName: '',
    gamesWantToPlay: [],
    gamesPlayed: [],
    friends: []
  }

  const [state, dispatch] = useReducer(userReducer, initialState)

  // Execute back end authentication service for login feature
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

  // Execute back end registration service 
  const executeRegisterService = (userName, email, password) => {
    axios
      .post(`${API_URL}/account/registration`, {
        userName,
        email,
        password,
      })
      .then((response) => {
        //response.data.jwt 
        console.log(response)
        sessionStorage.setItem(REGISTER_SESSION, email)
        dispatch({
          type: 'REGISTER',
          payload: email,
        })
      })
      .catch(() => {
        dispatch({
          type: 'REGISTER_ERROR',
        })
      })
  }

  const getGamer = () => {
    // axios
    //   .get(`https://cat-fact.herokuapp.com/facts`, {
    //     email       
    //   })
    //   .then(response => {
        // console.log(response);
        dispatch({
          type: 'USER_INFO',
          payload: {'userId': 1, 'userName': 'James', 'email': 'gj@qq.com', 'gamesWantToPlay': ['3498','3576'], 'gamesPlayed': ['3498'], 'friends': ['7','8','9']}
        })
      // })
      // .catch(() => {
      //   dispatch({
      //     tpye: 'REGISTER_ERROR',
      //   })
      // })
  }

  return (
    <UserContext.Provider
      value={{
        userEmail: state.userEmail,
        loggedIn: state.loggedIn,
        error: state.error,
        userId: state.userId,
        userName: state.userName,
        gamesWantToPlay: state.gamesWantToPlay,
        gamesPlayed: state.gamesPlayed,
        friends: state.friends,
        executeAuthenticationService,
        logout,
        executeRegisterService,
        getGamer,
      }}
    >
      {children}
    </UserContext.Provider>
  )


}

export default UserContext
