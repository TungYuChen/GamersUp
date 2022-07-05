const userReducer = (state, action) => {
  switch (action.type) {
    case 'GET_USER':
      return {
        ...state,
        loggedIn: true,
        error: false,
        user: action.payload,
        userID: action.payload.userID,
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
      }
    case 'GET_PlAYED':
      return {
        ...state,
        played: action.payload,
      }
    case 'ERROR':
      return {
        ...state,
        error: true,
      }
    default:
      return state
  }
}

export default userReducer
