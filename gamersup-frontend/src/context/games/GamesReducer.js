const gamesReducer = (state, action) => {
  switch (action.type) {
    case 'GET_GAMES':
      return {
        ...state,
        games: action.payload.results,
        nextUrl: action.payload.next,
        prevUrl: action.payload.previous,
        loading: false,
      }
    case 'SET_NEXT':
      return {
        ...state,
        page: action.payload,
      }
    case 'SET_PREV':
      return {
        ...state,
        page: action.payload,
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
