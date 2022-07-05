import { React, useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gameimage from '../../images/gameimage.jpg'
import { PlusIcon, CheckIcon } from '@heroicons/react/solid'
import PropTypes from 'prop-types'
import UserContext from '../../context/user/UserContext'

function GameItem({ game: { id, name, background_image, rating } }) {
  const { loggedIn, clickWantToPlay, checkWantToPlay, checkPlayed } =
    useContext(UserContext)
  const [validImage, setValidImage] = useState(true)
  const [wantToPlay, setWantToPlay] = useState(false)
  const [played, setPlayed] = useState(false)

  useEffect(() => {
    if (background_image == null) {
      setValidImage(false)
    }
    console.log(checkWantToPlay(id))
    if (checkWantToPlay(id) == true) {
      console.log("test")
      setWantToPlay(true)
    }
    if (checkPlayed(id) === true) {
      setPlayed(true)
    } 
  }, [])

  const handleClickWant = (e) => {
    e.preventDefault()
    clickWantToPlay(id)
  }

  return (
    <div className='card w-72 bg-base-200 shadow-xl'>
      <Link to={`/game/${id}`}>
        {validImage && (
          <figure>
            <img
              className='custom-card-image'
              src={background_image}
              alt={'game_image'}
            />
          </figure>
        )}

        {!validImage && (
          <figure>
            <img
              className='custom-card-image'
              src={gameimage}
              alt={'default_game_image'}
            />
          </figure>
        )}
      </Link>

      <div className='card-body'>
        <div className='card-title text-base mb-3'>
          <div className='inline badge badge-accent font-bold'>{rating}</div>
          <Link to={`/game/${id}`}>{name}</Link>
        </div>
        {loggedIn && (
          <div className='card-actions justify-start'>
            {wantToPlay && (
              <button
                className='btn-ghost bg-primary badge badge-outline text-xs hover:bg-primary-focus'
                onClick={handleClickWant}
              >
                <PlusIcon className='inline mr-1 w-5' />
                Added
              </button>
            )}
            {!wantToPlay && (
              <button
                className='btn-ghost badge badge-outline text-xs hover:bg-primary-focus'
                onClick={handleClickWant}
              >
                <PlusIcon className='inline mr-1 w-5' />
                Want to Play
              </button>
            )}
            {played && (
              <button className='btn-ghost bg-primary badge badge-outline text-xs hover:bg-primary-focus'>
                <CheckIcon className='inline mr-1 w-5' />
                Added
              </button>
            )}
            {!played && (
              <button className='btn-ghost badge badge-outline text-xs hover:bg-primary-focus'>
                <CheckIcon className='inline mr-1 w-5' />
                Played
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

GameItem.propTypes = {
  game: PropTypes.object,
}

export default GameItem
