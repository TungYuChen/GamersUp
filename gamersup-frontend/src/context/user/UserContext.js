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
    reading: true,
    user: {}, // logged user
    userID: 0,
    gamer: {}, // another gamer besides the user
    wantToPlay: [],
    played: [],
  }

  const [state, dispatch] = useReducer(userReducer, initialState)

  const reading = (load) => {
    dispatch({ type: 'READING', payload: load })
  }

  // Execute back end authentication service for login feature
  const executeAuthenticationService = async (email, password) => {
    await axios
      .post(`${API_URL}/account/authenticate`, {
        email,
        password,
      })
      .then((response) => {
        //response.data.jwt
        // console.log(response)
        getUserProfile(email)
        sessionStorage.setItem(LOGIN_SESSION, email)
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

  const isLoggedIn = () => {
    const email = sessionStorage.getItem(LOGIN_SESSION)
    if (email === null) {
      return false
    } else {
      return true
    }
  }

  // Execute back end registration service
  const executeRegisterService = async (userName, email, password) => {
    await axios
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
        })
      })
      .catch(() => {
        dispatch({
          type: 'ERROR',
        })
      })
  }

  const getUserProfile = async (email) => {
    await axios
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

  const getGamerById = async (id) => {
    await axios
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
    reading(true)
    await axios
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

  // Wait delete
  const getGamer = () => {
    reading(true)
    // axios
    //   .get(`https://cat-fact.herokuapp.com/facts`, {
    //     email
    //   })
    //   .then(response => {
    // console.log(response);
    dispatch({
      type: 'USER_INFO',
      payload: {
        userId: 1,
        userName: 'James',
        email: 'gj@qq.com',
        gamesWantToPlay: ['3498', '3576'],
        gamesPlayed: ['3498', '2178'],
        friends: ['7', '8', '9'],
        reading: false,
      },
    })
  }

  const getPlayedByGamerId = async (id) => {
    reading(true)
    await axios
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

  const clickWantToPlay = async (gameID) => {
    const gamerID = state.userID
    await axios
      .put(`${API_URL}/games/wanttoplay`, { gameID, gamerID })
      .then((response) => {
        console.log(response.data)
      })
      .catch((err) => {
        dispatch({
          type: 'ERROR',
        })
      })
  }

  const clickPlayed = async (gameID) => {
    const gamerID = state.userID
    await axios
      .put(`${API_URL}/games/played`, { gameID, gamerID })
      .then((response) => {
        console.log(response.data)
      })
      .catch((err) => {
        dispatch({
          type: 'ERROR',
        })
      })
  }

  // const checkWantToPlay = async (gameID) => {
  //   const gamerID = state.userID
  //   return await axios
  //     .post(`${API_URL}/games/check/wanttoplay`, {
  //       gameID,
  //       gamerID,
  //     })
  // .then((response) => {
  //   // console.log(response.data)
  //   return response.data
  // })
  // .catch((err) => {
  //   dispatch({
  //     type: 'ERROR',
  //   })
  // })
  // }

  // const checkPlayed = async (gameID) => {
  //   const gamerID = state.userID
  //   axios
  //     .post(`${API_URL}/games/check/played`, {
  //       gameID,
  //       gamerID,
  //     })
  //     .then((response) => {
  //       // console.log(response.data)
  //       return response.data
  //     })
  //     .catch((err) => {
  //       dispatch({
  //         type: 'ERROR',
  //       })
  //     })
  // }

  return (
    <UserContext.Provider
      value={{
        loggedIn: state.loggedIn,
        error: state.error,
        reading: state.reading,
        user: state.useReducer,
        userID: state.userID,
        gamer: state.gamer,
        wantToPlay: state.wantToPlay,
        played: state.played,
        executeAuthenticationService,
        logout,
        executeRegisterService,
        getUserProfile,
        clickWantToPlay,
        clickPlayed,
        getGamerById,
        getWantToPlayByGamerId,
        getGamer,
        getPlayedByGamerId,
        isLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserContext
