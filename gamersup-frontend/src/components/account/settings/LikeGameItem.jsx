import React from 'react'
import { ThumbUpIcon, ThumbDownIcon } from '@heroicons/react/solid'

function LikeGameItem({
  game: { id, name, background_image },
  user: { userID },
}) {
  return (
    <div className='card h-40 bg-base-100 shadow-xl image-full'>
      <figure>
        <img src={background_image} alt='Game_Image' />
      </figure>
      <div className='card-body'>
        <div className='text-base font-semibold'>{name}</div>
        <div className='card-actions justify-end'>
          <ThumbUpIcon className='btn btn-ghost btn-circle mr-1 w-8 hover:text-primary' />
          <ThumbDownIcon className='btn btn-ghost btn-circle mr-1 w-8 hover:text-primary' />
        </div>
      </div>
    </div>
  )
}

export default LikeGameItem
