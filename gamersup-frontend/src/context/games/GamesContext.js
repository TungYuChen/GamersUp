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
  }

  const [state, dispatch] = useReducer(gamesReducer, initialState)

  //Set loading
  const setLoading = () => dispatch({ type: 'LOADING' })

  //Get first page with ordering
  const getGames = async (ordering) => {
    setLoading()

    const response = await fetch(
      `${RAWG_API_URL}/games?key=${RAWG_API_KEY}&ordering=${ordering}`
    )

    const data = await response.json()

    dispatch({
      type: 'GET_GAMES',
      payload: data,
    })
  }

  //Get games using url
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
        getGames,
        setNextPage,
        setPrevPage,
      }}
    >
      {children}
    </GamesContext.Provider>
  )
}

export default GamesContext
