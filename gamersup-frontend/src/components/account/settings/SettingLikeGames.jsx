import React from 'react'
import LikeGamesList from './LikeGamesList'

function SettingLikeGames() {
  return (
    <>
      <div className='card bg-base-100 shadow-xl w-full mt-3 mb-3 mx-auto'>
        <div className='card-body min-h-full px-10'>
          <div className='space-y-3'>
            <h2 className='card-title text-center text-2xl font-extrabold text-neutral-content'>
              Love or Hate
            </h2>
            <p className='text-sm text-gray-300'>
              Please choose games that you love or hate.
            </p>
          </div>
          <div>
            <LikeGamesList />
          </div>
        </div>
      </div>
    </>
  )
}

export default SettingLikeGames
