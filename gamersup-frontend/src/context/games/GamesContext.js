import { createContext, useReducer } from 'react'
import gamesReducer from './GamesReducer'
import axios from 'axios'

const GamesContext = createContext()

const RAWG_API_URL = process.env.REACT_APP_RAWG_API_URL
const RAWG_API_KEY = process.env.REACT_APP_RAWG_API_KEY
const API_URL = process.env.REACT_APP_BACKEND_API_URL

export const GamesProvider = ({ children }) => {
  const initialState = {
    games: [],
    game: {},
    loading: true,
    page: 1, // page starting from 1
    nextUrl: '',
    prevUrl: '',
    platformId: '0',
    searchText: '',
    gamesWantToPlay: {},
    gamesPlayed: {},
    // wantToPlayGamers: [], // a list of gamers who what to play this game
    // playedGamers: [], // a list of gamers who played this game
    gameError: false,
  }

  const [state, dispatch] = useReducer(gamesReducer, initialState)

  //Set loading
  const setLoading = () => dispatch({ type: 'LOADING' })

  //Get first page with platform id
  const getGames = (id, text) => {
    setLoading()

    //for all platforms
    let url = `${RAWG_API_URL}/games?key=${RAWG_API_KEY}&ordering=-rating`
    if (id !== '0') {
      url += `&platforms=${id}`
    }
    if (text !== '') {
      url += `&search=${text}`
    }

    axios
      .get(url)
      .then((response) => {
        // console.log(response.data)
        dispatch({
          type: 'GET_GAMES',
          payload: response.data,
        })
      })
      .catch((err) => {
        dispatch({
          type: 'ERROR',
        })
      })
  }

  //Platform id >> PC-4, PS5-187, PS4-18, Nintendo Switch-7, Xbox Series X/S-186, Xbox One-1, Wii U-10
  const setPlatform = (id) => {
    getGames(id, state.searchText)
    dispatch({
      type: 'SET_PLATFORM',
      payload: id,
    })
  }

  //Get games with search text
  const searchGames = (text) => {
    getGames(state.platformId, text)
    dispatch({
      type: 'SET_SEARCH_TEXT',
      payload: text,
    })
  }

  //Get games using url for next & previous page
  const getGamesWithUrl = async (url) => {
    setLoading()
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

  const getGameByGameId = (id) => {
    setLoading()
    const url = `${RAWG_API_URL}/games/${id}?key=${RAWG_API_KEY}`
    axios
      .get(url)
      .then((response) => {
        dispatch({
          type: 'GET_GAME',
          payload: response.data,
        })
      })
      .catch(() => {
        dispatch({
          type: 'ERROR',
        })
      })
  }

  // the last version of getGame
  const getGameByID = (id) => {
    return axios.get(`${RAWG_API_URL}/games/${id}?key=${RAWG_API_KEY}`)
  }

  const getWantToPlayGamersByGameId = (id) => {
    return axios.get(`${API_URL}/games/game=${id}/wanttoplaygamerslist`)
    // .then((response) => {
    //   console.log(response.data)
    //   dispatch({
    //     type: 'GET_WANT_GAMERS',
    //     payload: response.data,
    //   })
    // })
    // .catch((err) => {
    //   dispatch({
    //     type: 'ERROR',
    //   })
    // })
  }

  const getPlayedGamersByGameId = (id) => {
    return axios.get(`${API_URL}/games/game=${id}/playedgamerslist`)
    // .then((response) => {
    //   console.log(response.data)
    //   dispatch({
    //     type: 'GET_PlAYED_GAMERS',
    //     payload: response.data,
    //   })
    // })
    // .catch((err) => {
    //   dispatch({
    //     type: 'ERROR',
    //   })
    // })
  }

  const getGamesByIdList = async (gamesWantToPlay, gamesPlayed) => {
    setLoading()
    const wannaGames = []
    for (var i = 0; i < gamesWantToPlay.length; i++) {
      wannaGames.push(
        await axios
          .get(
            `${RAWG_API_URL}/games/${gamesWantToPlay[i]}?key=${RAWG_API_KEY}`
          )
          .then((response) => response.data)
      )
    }
    console.log(wannaGames)
    while (wannaGames.length < gamesWantToPlay.length) {
      setTimeout(10)
    }
  }

  //   const getGamesWantToPlayAndGamesPlayedById = async (userid) => {
  //     setLoading();
  //     const gamesWantToPlay = [];
  //     const gamesPlayed = [];

  //     await axios.get(`${API_URL}/games/user=${userid}/wanttoplaylist`)
  //     .then(response => {
  //       response.data.array.forEach(gameId => {
  //         gamesWantToPlay.push(gameId);
  //       });
  //     });

  //     await axios.get(`${API_URL}/games/user=${userid}/playedlist`)
  //     .then(response => {
  //       response.data.array.forEach(gameId => {
  //         gamesPlayed.push(gameId)
  //       })
  //     });

  //     getGamesByIdList(gamesWantToPlay, gamesPlayed);
  // }

  //   const getPlayedGamesByGameId = async (id) => {
  //     setLoading()
  //     axios
  //       .get(`${API_URL}/games/game={id}/playedgamerslist`)
  //       .then((response) => {
  //         console.log(response.data)
  //         dispatch({
  //           type: 'GET_PlAYED_GAMERS',
  //           payload: response.data,
  //         })
  //       })
  //       .catch((err) => {
  //         dispatch({
  //           type: 'ERROR',
  //         })
  //       })
  //   }

  //   dispatch({
  //     type: 'LIST_GAMES',
  //     payload: {
  //       gamesWantToPlayObjects: wannaGames,
  //       gamesPlayedObjects: playedGames,
  //     },
  //   })
  // }

  return (
    <GamesContext.Provider
      value={{
        games: state.games,
        loading: state.loading,
        page: state.page,
        platformId: state.platformId,
        searchText: state.searchText,
        game: state.game,
        gamesWantToPlayObjects: state.gamesWantToPlayObjects,
        gamesPlayedObjects: state.gamesPlayedObjects,
        // wantToPlayGamers: state.wantToPlayGamers,
        // playedGamers: state.playedGamers,
        gameError: state.gameError,
        getGames,
        setNextPage,
        setPrevPage,
        setPlatform,
        searchGames,
        getGameByGameId,
        getWantToPlayGamersByGameId,
        getPlayedGamersByGameId,
        getGameByID,
      }}
    >
      {children}
    </GamesContext.Provider>
  )
}

export default GamesContext
