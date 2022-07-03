const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        userEmail: action.payload,
        loggedIn: true,
        error: false,
      }
    case 'LOGOUT':
      return {
        userEmail: '',
        loggedIn: false,
        error: false,
      }
    case 'CREDENTIAL_ERROR':
      return {
        userEmail: '',
        loggedIn: false,
        error: true,
      }
    case 'REGISTER':
      return {
        userEmail: action.payload,
        error: false,
      }
    case 'REGISTER_ERROR':
      return {
        error: true,
      }
    case 'USER_INFO':      
      return {
        ...state,
        userId: action.payload.userId,
        userName: action.payload.userName,
        gamesWantToPlay: action.payload.gamesWantToPlay,
        gamesPlayed: action.payload.gamesPlayed,
        friends: action.payload.friends,
        userEmail: action.payload.email,
        reading: false
      }
    case 'READING':
      return {
        ...state,
        reading: action.payload
      }
    default:
      return state
  }
}

export default userReducer
