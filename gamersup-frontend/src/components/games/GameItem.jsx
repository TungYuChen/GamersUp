import { React, useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import gameimage from '../../images/gameimage.jpg'
import { PlusIcon, CheckIcon } from '@heroicons/react/solid'
import PropTypes from 'prop-types'
import UserContext from '../../context/user/UserContext'
import axios from 'axios'

function GameItem({ game: { id, name, background_image, rating }, user: {userID} }) {
  const navigate = useNavigate()

  const API_URL = process.env.REACT_APP_BACKEND_API_URL

  const { isLoggedIn, clickWantToPlay, clickPlayed } = useContext(UserContext)
  const [validImage, setValidImage] = useState(true)
  const [wantToPlay, setWantToPlay] = useState(false)
  const [played, setPlayed] = useState(false)
  const [click, setClick] = useState(0)

  const checkWantToPlay = async (gameID) => {
    const { data } = await axios.post(`${API_URL}/games/check/wanttoplay`, {
      gameID,
      gamerID: userID,
    })
    setWantToPlay(data)
  }

  const checkPlayed = async (gameID) => {
    const { data } = await axios.post(`${API_URL}/games/check/played`, {
      gameID,
      gamerID: userID,
    })
    setPlayed(data)
  }

  useEffect(() => {
    if (background_image == null) {
      setValidImage(false)
    }
    if (isLoggedIn()) {
      checkWantToPlay(id)
      checkPlayed(id)
    }
    setClick(0)
  }, [click])

  const handleClickWant = async (e) => {
    e.preventDefault()
    if (isLoggedIn()) {
      await clickWantToPlay(id, userID)
      setClick(1)
    } else {
      navigate('/login', { replace: true })
    }
  }

  const handleClickPlayed = async (e) => {
    e.preventDefault()
    if (isLoggedIn()) {
      await clickPlayed(id, userID)
      setClick(1)
    } else {
      navigate('/login', { replace: true })
    }
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
            <button
              className='btn-ghost bg-primary badge badge-outline text-xs hover:bg-primary-focus'
              onClick={handleClickPlayed}
            >
              <CheckIcon className='inline mr-1 w-5' />
              Added
            </button>
          )}
          {!played && (
            <button
              className='btn-ghost badge badge-outline text-xs hover:bg-primary-focus'
              onClick={handleClickPlayed}
            >
              <CheckIcon className='inline mr-1 w-5' />
              Played
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

GameItem.propTypes = {
  game: PropTypes.object,
}

export default GameItem
