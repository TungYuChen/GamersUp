import React from 'react'
import { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CursorClickIcon } from '@heroicons/react/solid'
import RecommendFriends from '../components/recommendations/RecommendFriends'
import RecommendGames from '../components/recommendations/RecommendGames'
import UserContext from '../context/user/UserContext'

function RecommendationPage() {
  const { hasRatings } = useContext(UserContext)

  const [ratings, SetRatings] = useState()

  const params = useParams()

  useEffect(() => {
    hasRatings(params.id)
      .then((result) => {
        SetRatings(result.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <>
      <h2 className='text-3xl font-bold my-5 text-center text-info'>
        RECOMMENDATIONS FOR YOU
      </h2>
      {ratings && (
        <>
          <RecommendFriends />
          <RecommendGames />
        </>
      )}
      {!ratings && (
        <div className='alert shadow-lg w-3/5 mx-auto'>
          <div className='pl-10'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              className='stroke-info flex-shrink-0 w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              ></path>
            </svg>
            <span>
              Add ratings on games in settings page for your customized recommendations!
              <Link to='/settings'>
                <CursorClickIcon className='inline w-6 ml-5' />
              </Link>
            </span>
          </div>
        </div>
      )}
    </>
  )
}

export default RecommendationPage
