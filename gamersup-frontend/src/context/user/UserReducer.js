const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        error: false,
        user: action.payload,
      }
    case 'GET_LOGGED_USER':
      return {
        ...state,
        user: action.payload,
      }
    case 'LOGOUT':
      return {
        ...state,
        user: { userID: 0 },
      }
    case 'REGISTER':
      return {
        ...state,
        error: false,
      }
    case 'GET_WANT_TO_PLAY':
      return {
        ...state,
        wantToPlay: action.payload,
        reading: false,
      }
    case 'GET_PLAYED':
      return {
        ...state,
        played: action.payload,
        fetching: false,
      }
    case 'READING':
      return {
        ...state,
        reading: action.payload,
        error: false,
      }

    case 'ERROR':
      return {
        user: { userID: 0 },
        error: true,
      }   
    default:
      return state
  }
}

export default userReducer
