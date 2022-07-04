const userReducer = (state, action) => {
  switch (action.type) {
    case 'GET_USER':
      return {
        loggedIn: true,
        error: false,
        user: action.payload,
      }
    case 'GET_GAMER':
      return {
        ...state,
        gamer: action.payload,
      }
    case 'LOGOUT':
      return {
        loggedIn: false,
        error: false,
        user: {},
      }
    case 'REGISTER':
      return {
        error: false,
      }
    case 'GET_WANT_TO_PLAY':
      return {
        ...state,
        wantToPlay: action.payload,
        reading: false
      }
    case 'GET_PlAYED':
      return {
        ...state,
        played: action.payload,
        reading: false
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
        reading: action.payload,
        error: true,
      }

    case 'ERROR':
      return {
        ...state,
        error: true
      }
    default:
      return state
  }
}

export default userReducer
