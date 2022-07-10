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
    case 'GET_GAME':
      return {
        ...state,
        game: action.payload,
        loading: false,
      }
    case 'SET_PLATFORM':
      return {
        ...state,
        page: 1,
        platformId: action.payload,
      }
    case 'SET_SEARCH_TEXT':
      return {
        ...state,
        page: 1,
        searchText: action.payload,
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
    // case 'GET_WANT_GAMERS':
    //   return {
    //     ...state,
    //     wantToPlayGamers: action.payload,
    //   }
    // case 'GET_PlAYED_GAMERS':
    //   return {
    //     ...state,
    //     playedGamers: action.payload,
    //   }
    case 'LOADING':
      return {
        ...state,
        loading: true,
      }
    case 'LIST_GAMES':
      return {
        ...state,
        gamesWantToPlayObjects: action.payload.gamesWantToPlayObjects,
        gamesPlayedObjects: action.payload.gamesPlayedObjects,
        loading: false,
      }
    case 'ERROR':
      return {
        ...state,
        gameError: true,
      }
    default:
      return state
  }
}

export default gamesReducer
