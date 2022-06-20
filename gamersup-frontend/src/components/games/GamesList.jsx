import { useContext, useEffect } from 'react'
import GamesContext from '../../context/games/GamesContext'
import Loading from '../layout/Loading'
import PageBar from '../layout/PageBar'
import GameItem from './GameItem'
import PropTypes from 'prop-types'

function GamesList({ ordering }) {
  const { games, loading, platformId, getGames } = useContext(GamesContext)

  useEffect(() => {
    // get games ordered by ordering
    getGames(ordering, platformId)
  }, [])

  if (loading) {
    return <Loading />
  } else {
    return (
      <>
        <PageBar />
        <div className='grid gap-5 grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 mt-5 mb-5'>
          {games.map((game) => (
            <GameItem key={game.id} game={game} />
          ))}
        </div>
        <PageBar />
      </>
    )
  }
}

GamesList.defaultProps = {
  ordering: '-rating',
}

GamesList.propTypes = {
  ordering: PropTypes.string,
}

export default GamesList
