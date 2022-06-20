import { createContext, useReducer } from 'react'
import gamesReducer from './GamesReducer'

const GamesContext = createContext()

const RAWG_API_URL = process.env.REACT_APP_RAWG_API_URL
const RAWG_API_KEY = process.env.REACT_APP_RAWG_API_KEY

export const GamesProvider = ({ children }) => {
  const initialState = {
    games: [],
    loading: false,
    page: 1, // page starting from 1
    nextUrl: '',
    prevUrl: '',
    platformId: '0',
  }

  const [state, dispatch] = useReducer(gamesReducer, initialState)

  //Set loading
  const setLoading = () => dispatch({ type: 'LOADING' })

  //Get first page with ordering
  const getGames = async (ordering, platformId) => {
    setLoading()

    //for all platforms
    let url = `${RAWG_API_URL}/games?key=${RAWG_API_KEY}&ordering=${ordering}`
    if (platformId !== '0') {
      url = `${RAWG_API_URL}/games?key=${RAWG_API_KEY}&ordering=${ordering}&platforms=${platformId}`
    }

    const response = await fetch(url)
    const data = await response.json()

    dispatch({
      type: 'GET_GAMES',
      payload: data,
    })
  }

  //Platform id >> PC-4, PS5-187, PS4-18, Nintendo Switch-7, Xbox Series X/S-186, Xbox One-1, Wii U-10
  const setPlatform = (id) => {
    getGames('-rating', id)
    dispatch({
      type: 'SET_PLATFORM',
      playload: id,
    })
  }

  //Get games using url for next & previous page
  const getGamesWithUrl = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    dispatch({
      type: 'GET_GAMES',
      payload: data,
    })
  }

  const setNextPage = () => {
    getGamesWithUrl(state.nextUrl)
    dispatch({ type: 'SET_NEXT', payload: state.page + 1 })
  }

  const setPrevPage = () => {
    if (state.page > 1) {
      getGamesWithUrl(state.prevUrl)
      dispatch({ type: 'SET_PREV', payload: state.page - 1 })
    }
  }

  return (
    <GamesContext.Provider
      value={{
        games: state.games,
        loading: state.loading,
        page: state.page,
        platformId: state.platformId,
        getGames,
        setNextPage,
        setPrevPage,
        setPlatform,
      }}
    >
      {children}
    </GamesContext.Provider>
  )
}

export default GamesContext
