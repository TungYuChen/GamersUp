import { useContext, useEffect, useState } from 'react'
import GamesContext from '../../context/games/GamesContext'
import AlertContext from '../../context/alert/AlertContext'
import UserContext from '../../context/user/UserContext'
import GamePlatforms from './GamePlatforms'
import Loading from '../layout/Loading'
import PageBar from '../layout/PageBar'
import GameItem from './GameItem'

function GamesList() {
  const { games, loading, platformId, searchText, getGames } =
    useContext(GamesContext)

  const { alert, setAlert, removeAlert } = useContext(AlertContext)

  const { user, isLoggedIn, getLoggedUserInSession } = useContext(UserContext)

  useEffect(() => {
    // get games with platformId
    getGames(platformId, searchText)

    // get the logged user
    getLoggedUserInSession()
  }, [isLoggedIn()])

  if (loading) {
    return <Loading />
  } else if (games.length < 1) {
    let msg = 'Sorry. Currently unavailable.'
    if (searchText !== '') {
      msg = 'Sorry. No results for "' + searchText + '".'
    }
    setAlert(msg, 'information')

    return <GamePlatforms />
  } else {
    if (alert !== null) {
      removeAlert()
    }

    if (searchText !== '') {
      const msg = games.length + ' results for "' + searchText + '".'
      setAlert(msg, 'information')
    }

    return (
      <>
        <GamePlatforms />
        <PageBar />
        <div className='grid gap-5 grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 mt-5 mb-5'>
          {games.map((game) => (
            <GameItem key={game.id} game={game} user={user} />
          ))}
        </div>
        <PageBar />
      </>
    )
  }
}

export default GamesList
