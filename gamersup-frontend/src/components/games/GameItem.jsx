import { React, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gameimage from '../../images/gameimage.jpg'
import { PlusIcon, CheckIcon } from '@heroicons/react/solid'
import PropTypes from 'prop-types'

function GameItem({ game: { name, background_image, rating } }) {
  const [validImage, setValidImage] = useState(true)

  useEffect(() => {
    if (background_image == null) {
      setValidImage(false)
    }
  }, [])

  return (
    <div className='card w-72 bg-base-200 shadow-xl'>
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

      <div className='card-body'>
        <div className='card-title text-base mb-3'>
          <div class='inline badge badge-accent font-bold'>{rating}</div>
          {name}
        </div>
        <div className='card-actions justify-start'>
          <button className='btn-ghost badge badge-outline text-xs hover:bg-primary-focus'>
            <PlusIcon className='inline mr-1 w-5' />
            Want to Play
          </button>
          <button className='btn-ghost badge badge-outline text-xs'>
            <CheckIcon className='inline mr-1 w-5' />
            Played
          </button>
        </div>
      </div>
    </div>
  )
}

GameItem.propTypes = {
  gamer: PropTypes.object.isRequired,
}

export default GameItem
