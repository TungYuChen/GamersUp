import { React, useEffect, useContext, useState } from 'react'

import { ThumbUpIcon, ThumbDownIcon } from '@heroicons/react/solid'
import UserContext from '../../../context/user/UserContext'

function LikeGameItem({ game: { id, name, background_image } }) {
  const {
    addLoveGameReview,
    addHateGameReview,
    checkLoveGame,
    checkHateGame,
    cancelLoveHate,
  } = useContext(UserContext)

  const [love, setLove] = useState(false)
  const [hate, setHate] = useState(false)
  const [click, setClick] = useState(0)

  useEffect(() => {
    checkLoveGame(id).then((response) => {
      setLove(response.data)
    })
    checkHateGame(id).then((response) => {
      setHate(response.data)
    })

    setClick(0)
  }, [click])

  const handleClickLove = async (e) => {
    e.preventDefault()
    if (!love) {
      await addLoveGameReview(id)
    } else {
      await cancelLoveHate(id)
    }
    setClick(1)
  }

  const handleClickHate = async (e) => {
    e.preventDefault()
    if (!hate) {
      await addHateGameReview(id)
    } else {
      await cancelLoveHate(id)
    }
    setClick(1)
  }

  return (
    <div className='card h-40 bg-base-100 shadow-xl image-full'>
      <figure>
        <img src={background_image} alt='Game_Image' />
      </figure>
      <div className='card-body'>
        <div className='text-base font-semibold'>{name}</div>
        <div className='card-actions justify-end'>
          {love && (
            <ThumbUpIcon
              className='btn btn-ghost btn-circle mr-1 w-8 text-primary hover:text-primary'
              onClick={handleClickLove}
            />
          )}
          {!love && (
            <ThumbUpIcon
              className='btn btn-ghost btn-circle mr-1 w-8 hover:text-primary'
              onClick={handleClickLove}
            />
          )}
          {hate && (
            <ThumbDownIcon
              className='btn btn-ghost btn-circle mr-1 w-8 text-primary hover:text-primary'
              onClick={handleClickHate}
            />
          )}
          {!hate && (
            <ThumbDownIcon
              className='btn btn-ghost btn-circle mr-1 w-8 hover:text-primary'
              onClick={handleClickHate}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default LikeGameItem
