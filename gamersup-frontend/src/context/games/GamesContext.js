import { createContext, useReducer } from 'react'
import gamesReducer from './GamesReducer'

const GamesContext = createContext()

const RAWG_API_URL = process.env.REACT_APP_RAWG_API_URL
const RAWG_API_KEY = process.env.REACT_APP_RAWG_API_KEY

export const GamesProvider = ({ children }) => {
  const initialState = {
    games: [],
    loading: false,
    index: 0, // index of the page starting from 0
  }

  const [state, dispatch] = useReducer(gamesReducer, initialState)

  //Set loading
  const setLoading = () => dispatch({ type: 'LOADING' })

  const getGames = async (ordering) => {
    setLoading()

    let url = ''
    let page = state.index + 1
    if (page === 1) {
      url = `${RAWG_API_URL}/games?key=${RAWG_API_KEY}&ordering=${ordering}`
    } else {
      url = `${RAWG_API_URL}/games?key=${RAWG_API_KEY}&ordering=${ordering}&page=${page}`
    }
    const response = await fetch(url)

    const { results } = await response.json()

    dispatch({
      type: 'GET_GAMES',
      payload: results,
    })
  }

  const setNextPage = () => dispatch({ type: 'SET_NEXT', payload: (state.index + 1) })

  const setPrevPage = () => {
    if (state.index > 0) {
      dispatch({ type: 'SET_PREV', payload: (state.index - 1) })
    }
  }

  return (
    <GamesContext.Provider
      value={{
        games: state.games,
        loading: state.loading,
        index: state.index,
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
