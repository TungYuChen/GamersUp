const userReducer = (state, action) => {
  switch (action.type) {
    case 'GET_GAMER':
      return {
        ...state,
        gamer: action.payload,
      }
    case 'LOGOUT':
      return {
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
        reading: false,
      }
    case 'GET_PLAYED':
      return {
        ...state,
        played: action.payload,
        reading: false,
      }
    case 'READING':
      return {
        ...state,
        reading: action.payload,
        error: false,
      }

    case 'ERROR':
      return {
        ...state,
        error: true,
      }
    case 'FRIENDS':
      return {
        ...state,
        friends: action.payload,
        fetching: false,
      }
    case 'Fetching':
      return {
        ...state,
        fetching: true,
      }
    default:
      return state
  }
}

export default userReducer
