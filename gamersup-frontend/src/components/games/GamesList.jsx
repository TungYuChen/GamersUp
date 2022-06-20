import { useContext, useEffect } from 'react'
import GamesContext from '../../context/games/GamesContext'
import Loading from '../layout/Loading'
import PageBar from '../layout/PageBar'
import GameItem from './GameItem'
import { ChevronDownIcon } from '@heroicons/react/solid'
import PropTypes from 'prop-types'

function GamesList({ ordering }) {
  const { games, loading, getGames } = useContext(GamesContext)

  useEffect(() => {
    // get games ordered by ordering
    getGames(ordering)
  }, [])

  if (loading) {
    return <Loading />
  } else {
    return (
      <>
        <div className='flex place-content-center'>
          <button className='btn btn-ghost btn-lg text-3xl font-bold my-5'>
            Discover Games
            <ChevronDownIcon className='inline w-12 mt-1 ml-2 text-primary group-hover:text-primary-focus' />
          </button>
        </div>
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
