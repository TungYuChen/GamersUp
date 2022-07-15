import { createContext, useReducer, useContext } from 'react'
import userReducer from './UserReducer'
import axios from 'axios'

const UserContext = createContext()

const API_URL = process.env.REACT_APP_BACKEND_API_URL
const LOGIN_SESSION = process.env.REACT_APP_AUTH_SESSION
const REGISTER_SESSION = process.env.REACT_APP_REGISTER_SESSION


export const UserProvider = ({ children }) => {
  const initialState = {
    error: false,
    reading: true,
    user: { userID: 0 }, // logged user
    wantToPlay: [],
    played: [],  
  }

  const [state, dispatch] = useReducer(userReducer, initialState)  

  const reading = (load) => {
    dispatch({ type: 'READING', payload: load })
  }

  const fetching = () => {
    dispatch({
      type: 'FETCHING',
    })
  }

  // Execute back end authentication service for login feature
  const executeAuthenticationService = (email, password) => {
    return axios.post(`${API_URL}/account/authenticate`, {
      email,
      password,
    })
  }

  const getUserByEmail = (email) => {
    axios
      .get(`${API_URL}/gamers/email=${email}`)
      .then((response) => {
        const loggedUser = JSON.stringify(response.data)        
        sessionStorage.setItem(LOGIN_SESSION, loggedUser)
        dispatch({
          type: 'LOGIN',
          payload: response.data,
        })
      })
      .catch((err) => {
        console.log(err)
        dispatch({
          type: 'ERROR',
        })
      })
  }

  const getLoggedUserInSession = () => {
    if (isLoggedIn()) {
      const loggedUser = JSON.parse(sessionStorage.getItem(LOGIN_SESSION))      
      dispatch({
        type: 'GET_LOGGED_USER',
        payload: loggedUser,
      })
    }
  }

  const logout = () => {
    sessionStorage.removeItem(LOGIN_SESSION)
    dispatch({
      type: 'LOGOUT',
    })
  }

  const isLoggedIn = () => {
    const loggedUser = sessionStorage.getItem(LOGIN_SESSION)
    if (loggedUser !== null) {
      return true
    }
    return false
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
      .catch((err) => {
        console.log(err)
        dispatch({
          type: 'ERROR',
        })
      })
  }

  const getGamerById = (id) => {
    return axios.get(`${API_URL}/gamers/gamer=${id}`)
  }

  const getWantToPlayByGamerId = async (id) => {
    reading(true)
    await axios
      .get(`${API_URL}/games/user=${id}/wanttoplaylist`)
      .then((response) => {          
        dispatch({
          type: 'GET_WANT_TO_PLAY',
          payload: response.data,
        })
      })
      .catch((err) => {
        console.log(err)
        dispatch({
          type: 'ERROR',
        })
      })
  }

  const getPlayedByGamerId = async (id) => {
    fetching(true)
    await axios
      .get(`${API_URL}/games/user=${id}/playedlist`)
      .then((response) => {
                dispatch({
          type: 'GET_PLAYED',
          payload: response.data,
        })
      })
      .catch((err) => {
        console.log(err)
        dispatch({
          type: 'ERROR',
        })
      })
  }

  const clickWantToPlay = async (gameID, gamerID) => {
    // const gamerID = gamer.userID
    await axios
      .put(`${API_URL}/games/wanttoplay`, { gameID, gamerID })
      .then((response) => {
        console.log(response.data)
      })
      .catch((err) => {
        console.log(err)
        dispatch({
          type: 'ERROR',
        })
      })
  }

  const clickPlayed = async (gameID, gamerID) => {
    // const gamerID = gamer.userID
    await axios
      .put(`${API_URL}/games/played`, { gameID, gamerID })
      .then((response) => {
        console.log(response.data)
      })
      .catch((err) => {
        console.log(err)
        dispatch({
          type: 'ERROR',
        })
      })
  }

  const checkWantToPlay = async (id) => {
    return axios.post(`${API_URL}/games/check/wanttoplay`, {
      gameID: id,
      gamerID: state.user.userID,
    })
  }

  const checkPlayed = async (id) => {
    return await axios.post(`${API_URL}/games/check/played`, {
      gameID: id,
      gamerID: state.user.userID,
    })
  }

  const changeBio = async (bio) => {
    const userId = state.user.userID
    axios
      .put(`${API_URL}/gamers/bio/changebio`, {
        userId,
        bio,
      })
      .then((response) => {
        console.log(response.data)
        getUserByEmail(state.user.email)
      })
      .catch((err) => {
        console.log(err)
        dispatch({
          type: 'ERROR',
        })
      })
  }

  const changeAvatar = async (url) => {
    const userId = state.user.userID
    axios
      .put(`${API_URL}/gamers/changeAvatar`, {
        userId,
        url,
      })
      .then((response) => 
      {
        console.log(response);
        getUserByEmail(state.user.email)
      })
      .catch((err) => {
        console.log(err)
        dispatch({
          type: 'ERROR',
        })
      })
  }

  const changeBirthday = dob => {
    const userId = state.user.userID;
    return axios.put(`${API_URL}/gamers/changeBirthday`, {
      userId,
      dob,
    });
  }

  const changeLevel = level => {
    const userId = state.user.userID;
    return axios.put(`${API_URL}/gamers/changeLevel`, {
      userId,
      level,
    })
  }

  const changeLikes = likes => {
    const userId = state.user.userID;
    return axios.put(`${API_URL}/gamers/changeLikes`, {
      userId,
      likes,
    })
  }

  const getFriends = async () => {
    fetching()
    //hardcode
    const friends = [1, 2]
    // const friends = state.user.friends;
    const friendList = []
    await friends.forEach(async (id) => {
      await axios
        .get(`${API_URL}/gamer=${id}`)
        .then((response) => friendList.push(response.data))
    })

    while (friendList.length < friends.length) {
      setTimeout(10)
    }

    dispatch({
      type: 'FRIENDS',
      payload: friendList,
    })
  }

  

  return (
    <UserContext.Provider
      value={{
        error: state.error,
        reading: state.reading,
        user: state.user,
        wantToPlay: state.wantToPlay,
        played: state.played,
        wantToPlayObject: state.wantToPlayObject,
        playedObject: state.playedObject,
        executeAuthenticationService,
        getUserByEmail,
        logout,
        executeRegisterService,
        clickWantToPlay,
        clickPlayed,
        checkWantToPlay,
        checkPlayed,
        getGamerById,
        getWantToPlayByGamerId,
        getPlayedByGamerId,
        changeBio,
        changeAvatar,
        getFriends,
        isLoggedIn,
        getLoggedUserInSession,
        changeBirthday,
        changeLevel,
        changeLikes,
        
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserContext
