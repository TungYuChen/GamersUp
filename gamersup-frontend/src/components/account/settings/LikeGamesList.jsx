import { React, useContext, useEffect } from 'react'
import GamesContext from '../../../context/games/GamesContext'
import UserContext from '../../../context/user/UserContext'
import Loading from '../../layout/Loading'
import LikeGameItem from './LikeGameItem'
import PageBar from '../../layout/PageBar'

function LikeGamesList() {
  const { games, loading, getGames } = useContext(GamesContext)
  const { user } = useContext(UserContext)

  useEffect(() => {
    // get games with platformId
    getGames('0', '')
  }, [])

  if (loading) {
    return <Loading />
  } else {
    return (
      <>
        <PageBar />
        <div className='grid gap-5 grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 mt-5 mb-5'>
          {games.map((game) => (
            <LikeGameItem key={game.id} game={game} user={user} />
          ))}
        </div>
      </>
    )
  }
}

export default LikeGamesList
