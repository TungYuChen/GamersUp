import { createContext, useReducer } from 'react'
import userReducer from './UserReducer'
import axios from 'axios'

const UserContext = createContext()

const API_URL = process.env.REACT_APP_BACKEND_API_URL
const LOGIN_SESSION = process.env.REACT_APP_EMAIL_SESSION
const REGISTER_SESSION = process.env.REACT_APP_REGISTER_SESSION

export const UserProvider = ({ children }) => {
  const initialState = {
    loggedIn: false,
    error: false,
    userId: '',
    userName: '',
    gamesWantToPlay: [],
    gamesPlayed: [],
    friends: [],
    reading: true,
    user: {}, // logged user
    gamer: {}, // another gamer besides the user
    wantToPlay: [],
    played: [],
  }

  const [state, dispatch] = useReducer(userReducer, initialState)  

  const reading = () => {
    dispatch({type: 'READING',
              payload: true}) 
  }


  // Execute back end authentication service for login feature
  const executeAuthenticationService = (email, password) => {
    axios
      .post(`${API_URL}/account/authenticate`, {
        email,
        password,
      })
      .then((response) => {
        sessionStorage.setItem(LOGIN_SESSION, email)
        //response.data.jwt
        // console.log(response)
        getUserProfile(email)
      })
      .catch(() => {
        dispatch({
          type: 'ERROR',
        })
      })
  }

  const logout = () => {
    sessionStorage.removeItem(LOGIN_SESSION)
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
        // console.log(response)
        sessionStorage.setItem(REGISTER_SESSION, email)
        dispatch({
          type: 'REGISTER',
          // payload: email,
        })
      })
      .catch(() => {
        dispatch({
          type: 'ERROR',
        })
      })
  }

  const getUserProfile = (email) => {
    axios
      .get(`${API_URL}/gamers/email=${email}`)
      .then((response) => {
        // console.log(response.data)
        dispatch({
          type: 'GET_USER',
          payload: response.data,
        })
      })
      .catch((err) => {
        dispatch({
          type: 'ERROR',
        })
      })
  }

  const getGamerById = (id) => {
    axios
      .get(`${API_URL}/gamers/gamer={id}`)
      .then((response) => {
        // console.log(response.data)
        dispatch({
          type: 'GET_GAMER',
          payload: response.data,
        })
      })
      .catch((err) => {
        dispatch({
          type: 'ERROR',
        })
      })
  }

  const getWantToPlayByGamerId = async (id) => {
    reading()
    axios
      .get(`${API_URL}/games/user={id}/wanttoplaylist`)
      .then((response) => {
        console.log(response.data)
        dispatch({
          type: 'GET_WANT_TO_PLAY',
          payload: response.data,
        })
      })
      .catch((err) => {
        dispatch({
          type: 'ERROR',
        })
      })
  }


  const getGamer = () => {
    reading();
    // axios
    //   .get(`https://cat-fact.herokuapp.com/facts`, {
    //     email       
    //   })
    //   .then(response => {
        // console.log(response);
        dispatch({
          type: 'USER_INFO',
          payload: {'userId': 1, 'userName': 'James', 'email': 'gj@qq.com', 'gamesWantToPlay': ['3498','3576'], 'gamesPlayed': ['3498', '2178'], 'friends': ['7','8','9'], 'reading': false}})
    } 

  const getPlayedByGamerId = async (id) => {
    reading()
    axios
      .get(`${API_URL}/games/user={id}/playedlist`)
      .then((response) => {
        console.log(response.data)
        dispatch({
          type: 'GET_PlAYED',
          payload: response.data,
        })
      })
      .catch((err) => {
        dispatch({
          type: 'ERROR',

        })
      })
  }

  return (
    <UserContext.Provider
      value={{
        loggedIn: state.loggedIn,
        error: state.error,
        userId: state.userId,
        userName: state.userName,
        gamesWantToPlay: state.gamesWantToPlay,
        gamesPlayed: state.gamesPlayed,
        friends: state.friends,
        reading: state.reading,
        user: state.useReducer,
        gamer: state.gamer,
        wantToPlay: state.wantToPlay,
        played: state.played,
        userEmail: state.userEmail,
        executeAuthenticationService,
        logout,
        executeRegisterService,
        getUserProfile,
        getGamerById,
        getWantToPlayByGamerId,
        getGamer,
        getPlayedByGamerId
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserContext
