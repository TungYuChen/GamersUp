const gamesReducer = (state, action) => {
  switch (action.type) {
    case 'GET_GAMES':
      return {
        ...state,
        games: action.payload,
        loading: false,
      }
    case 'SET_NEXT':
      return {
        ...state,
        index: action.payload,
      }
    case 'SET_PREV':
      return {
        ...state,
        index: action.payload,
      }
    case 'LOADING':
      return {
        ...state,
        loading: true,
      }
    default:
      return state
  }
}

export default gamesReducer
