import { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import GamesContext from '../../context/games/GamesContext'
import { PlusIcon, LinkIcon } from '@heroicons/react/solid'
import UserContext from '../../context/user/UserContext'

function GameItemR({ userID, gameID }) {
  const { getGameByID } = useContext(GamesContext)
  const { isLoggedIn, clickWantToPlay, checkWantToPlay } =
    useContext(UserContext)

  const [game, setGame] = useState({})
  const [wantToPlay, setWantToPlay] = useState(false)
  const [click, setClick] = useState(0)

  useEffect(() => {
    getGameByID(gameID)
      .then((response) => {
        setGame(response.data)
      })
      .catch((error) => console.log(error))
  }, [])

  useEffect(() => {
    if (isLoggedIn()) {
      checkWantToPlay(gameID).then((response) => {
        setWantToPlay(response.data)
      })
    }
    setClick(0)
  }, [click])

  const handleClickWant = async (e) => {
    e.preventDefault()
    if (isLoggedIn()) {
      await clickWantToPlay(gameID, userID)
      setClick(1)
    }
  }

  const { name, background_image, website, rating, genres } = game

  return (
    <div className='card h-44 bg-base-100 shadow-xl image-full'>
      <figure>
        <img src={background_image} alt='Game_Image' />
      </figure>
      <div className='card-body'>
        <div className='text-base font-semibold'>
          <Link to={`/game/${gameID}`}>{name}</Link>
          <span className='inline badge badge-accent font-semibold ml-3'>
            {rating}
          </span>
        </div>
        <div className='flex mb-2'>
          {genres &&
            genres.map((genre) => (
              <div
                className='mr-2 badge badge-success text-xs font-semibold rounded'
                key={genre.id}
              >
                {genre.name}
              </div>
            ))}
        </div>
        <div className='card-actions justify-between'>
          <div className='btn-ghost rounded text-xs px-1 text-sm'>
            {website && (
              <a href={`${website}`} target='_blank'>
                More Info
                <LinkIcon className='inline w-5 ml-1' />
              </a>
            )}
          </div>
          {wantToPlay && (
            <div
              className='btn-ghost bg-primary btn-outline rounded-full text-xs px-2 hover:bg-primary-focus'
              onClick={handleClickWant}
            >
              <PlusIcon className='inline mr-1 w-5' />
              Added
            </div>
          )}
          {!wantToPlay && (
            <div
              className='btn-ghost btn-outline rounded-full text-xs px-2 hover:bg-primary-focus'
              onClick={handleClickWant}
            >
              <PlusIcon className='inline mr-1 w-5' />
              Want to Play
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default GameItemR
